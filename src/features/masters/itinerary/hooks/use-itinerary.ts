import { useQuery } from "@tanstack/react-query";
import { itineraryApi } from "@/lib/api/itinerary.api";

export const useItinerary = (id: string) => {
  return useQuery({
    queryKey: ['itineraries', id],
    queryFn: () => itineraryApi.getById(id),
    enabled: Boolean(id),
  });
};