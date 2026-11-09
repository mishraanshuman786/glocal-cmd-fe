"use client";

import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";

export function useCurrentUser(){
    return useQuery({
        queryKey:["auth","me"],
        queryFn:authApi.getCurrentUser,
        enabled:false
    });
}