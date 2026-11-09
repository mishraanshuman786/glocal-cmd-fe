'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../context/auth-context";

export function GuestRoute({children}:{children:React.ReactNode}){
    const {status}=useAuth();
    const router=useRouter();

    useEffect(()=>{
        if(status==='authenticated'){
            router.replace('/');
        }

    },[status, router]);

    if(status==='loading' || status==='authenticated'){
        return null;
    }

    return <>{children}</>;

}