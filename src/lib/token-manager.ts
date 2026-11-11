

let accessToken: string | null=null;

export const tokenManager={
    getAccessToken():string|null{
        return accessToken;
    },
    setAccessToken(token:string|null):void{
        accessToken=token;
    },
    clearAccessToken():void{
       accessToken=null;
    }
}