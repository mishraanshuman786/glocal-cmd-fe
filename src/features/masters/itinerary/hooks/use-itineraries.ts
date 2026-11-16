"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { itineraryApi } from "@/lib/api/itinerary.api";

import type {
  GetItinerariesParams,
} from "../types/itinerary.types";

export const itineraryKeys = {
  all: ["itineraries"] as const,

  list: (params: GetItinerariesParams) =>
    [...itineraryKeys.all, "list", params] as const,
};

export function useItineraries(params: GetItinerariesParams) {
  return useQuery({
    queryKey: itineraryKeys.list(params),

    queryFn: () => itineraryApi.getAll(params),

    // Keep the old results visible while fetching the new results.
    placeholderData: keepPreviousData,
  });
}