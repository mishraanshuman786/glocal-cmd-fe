import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itineraryApi } from "@/lib/api/itinerary.api";

export const useCreateItinerary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: itineraryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["itineraries"],
      });
    },
  });
};
