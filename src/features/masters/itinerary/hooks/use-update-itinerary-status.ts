"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { itineraryApi } from "@/lib/api/itinerary.api";
import { itineraryKeys } from "./use-itineraries";

import type {
  UpdateItineraryStatusRequest,
} from "../types/itinerary.types";

interface UpdateStatusVariables {
  id: string;
  status: UpdateItineraryStatusRequest;
}

export function useUpdateItineraryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateStatusVariables) =>
      itineraryApi.updateStatus(id, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: itineraryKeys.all,
      });
    },
  });
}