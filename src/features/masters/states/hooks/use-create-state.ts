"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { stateApi } from "@/lib/api/state.api";
import { stateKeys } from "./state-keys";

import type { CreateStatePayload } from "../types/state.types";

export function useCreateState(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(payload:CreateStatePayload)=>stateApi.create(payload),
        onSuccess:async ()=>{
            await Promise.all([
                queryClient.invalidateQueries({queryKey:stateKeys.lists()}),
                queryClient.invalidateQueries({queryKey:stateKeys.summary()})
            ])
        }

    })
}