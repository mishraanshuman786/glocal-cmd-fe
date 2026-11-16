import { api } from "../axios";

import type { CreateItineraryPayload, UpdateItineraryStatusRequest,ItineraryDetailsResponse, GetItinerariesParams,ItineraryListResponse } from "@/features/masters/itinerary/types/itinerary.types";

export const itineraryApi={
    getAll: async (params:GetItinerariesParams)=>{
        const response=await api.get<ItineraryListResponse>("/masters/itineraries",{params});
        return response.data;
    },
     getById: async (id: string): Promise<ItineraryDetailsResponse> => {
    const { data } = await api.get<ItineraryDetailsResponse>(
      `/masters/itineraries/${id}`,
    );

    return data;
  },
    create: async (payload: CreateItineraryPayload)=>{
        const {data}=await api.post('/masters/itineraries', payload);
        return data;
    },
    updateStatus: async (id:string, payload:UpdateItineraryStatusRequest)=>{
        const {data}=await api.patch(`/masters/itineraries/${id}/status`, payload);
        return data;
        
    },
   copy: async (id: string, title: string) => {
  const { data } = await api.post(
    `/masters/itineraries/${id}/copy`,
    { title },
  );

  return data;
},
}