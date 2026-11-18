"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { stateApi } from "@/lib/api/state.api";
import { stateKeys } from "./state-keys";

import type { UpdateStateStatusPayload } from "../types/state.types";

interface UpdateStateVariables {
  id: string;
  payload: UpdateStateStatusPayload;
}

export function useUpdateStateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateStateVariables) =>
      stateApi.updateStatus(id, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: stateKeys.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: stateKeys.summary(),
        }),
      ]);
    },
  });
}