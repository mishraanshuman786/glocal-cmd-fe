
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itineraryApi } from "@/lib/api/itinerary.api";
import { itineraryKeys } from "./use-itineraries";

interface CopyItineraryVariables {
  id: string;
  title: string;
}

export function useCopyItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: CopyItineraryVariables) =>
      itineraryApi.copy(id, title),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: itineraryKeys.all,
      });
    },
  });
}
