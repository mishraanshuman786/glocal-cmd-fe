"use client"
import { useQuery } from "@tanstack/react-query";
import { stateApi } from "@/lib/api/state.api";
import { stateKeys } from "./state-keys";

export function useStateSummary(){
    return useQuery({
        queryKey:stateKeys.summary(),
        queryFn:stateApi.getSummary
    })
}