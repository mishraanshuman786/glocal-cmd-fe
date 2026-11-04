import axios, {AxiosError, AxiosHeaders, InternalAxiosRequestConfig} from "axios";

import { env } from "@/config/env";
import { tokenManager } from "./token-manager";

interface RetryableRequest extends InternalAxiosRequestConfig{
    _retry?:boolean;
}

interface RefreshResponse{
    success:boolean;
    message:string;
    accessToken:string;
}



// axios instance to handle all the api requests other than refresh api, contains response interceptor
//  to call the refresh api for 401 error (when the access token expires)
export const api=axios.create({
    baseURL: env.apiUrl,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    },
    timeout: 15000
});

// This variable tracks whether a refresh operations is already running.
// null means no refresh is running
// A Promise means a refresh request is running
// Other failed requests can wait for that same promise
// Stores the currently running refresh operation.
let refreshPromise:Promise<string> | null=null;

// axois instance for handling the refresh api because if we use the api instance for 
//  calling the refresh api then if it also fails then again call refresh api and become infinite loop 
// It does not have the main response interceptor.
const refreshClient=axios.create({
    baseURL:env.apiUrl,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    },
    timeout:15000
});


// Request interceptor
api.interceptors.request.use((config)=>{
   const token=tokenManager.getAccessToken();

   if(token){
    config.headers.Authorization=`Bearer ${token}`;
   }

   return config;
});

// Response interceptor
api.interceptors.response.use(
    // Successfull response: return it normally
    (response)=>response,
    // Failed response: inspect the error.
    async (error:AxiosError)=>{
          const originalRequest=error.config as 
          | RetryableRequest
          | undefined;

        // if there is no request or it isn't a 401
        // don't try refreshing the token
        if(!originalRequest || error.response?.status !==401){
            return Promise.reject(error);
        } 

        const requestUrl= originalRequest.url ?? '';

        // Login, Logout and refresh failures should not start another refresh operation
        if(
            requestUrl.includes('/auth/login') ||
            requestUrl.includes('auth/logout') ||
            requestUrl.includes('auth/refresh')
    ){
        return Promise.reject(error);
    }

    // This request has already been retried. Don't create an infinite retry loop
    if(originalRequest._retry){
        tokenManager.clearAccessToken();
        return Promise.reject(error);
    }

    originalRequest._retry=true;

    try{
        // if refresh is not running , start one
        if(!refreshPromise){
            refreshPromise=refreshClient.post<RefreshResponse>('/auth/refresh').then((response)=>{
                const newAccessToken=response.data.accessToken;

                // save the new access token in memory
                tokenManager.setAccessToken(newAccessToken);

                return newAccessToken;

            }).finally(()=>{
                // Allow a future refresh operation
                refreshPromise=null;
            });
        }

        // wait for the existing refresh operation
        const newAccessToken=await refreshPromise;

        // Attach the new token to the failed request
        originalRequest.headers=AxiosHeaders.from(
            originalRequest.headers
        );

        originalRequest.headers.set('Authorization',`Bearer ${newAccessToken}`);

        // Retry the original Api request
        return api(originalRequest);

    } catch(refreshError){
        // Refresh failed. The session may have expired
        // or been revoked
        tokenManager.clearAccessToken();

        if(typeof window!== 'undefined'){
            window.location.assign('/login');
        }

        return Promise.reject(refreshError);
    }

    
    }

)
