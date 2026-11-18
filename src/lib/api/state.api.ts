
import { api } from "../axios";

import type {
  CreateStatePayload,
  CreateStateResponse,
  GetStatesParams,
  StateDetailsResponse,
  StatesListResponse,
  StateSummaryResponse,
  UpdateStateStatusPayload,
  UpdateStateStatusResponse,
} from "@/features/masters/states/types/state.types";

export const stateApi = {
  getAll: async (
    params: GetStatesParams,
  ): Promise<StatesListResponse> => {
    const { data } = await api.get<StatesListResponse>(
      "/masters/states",
      { params },
    );

    return data;
  },

  getById: async (
    id: string,
  ): Promise<StateDetailsResponse> => {
    const { data } = await api.get<StateDetailsResponse>(
      `/masters/states/${id}`,
    );

    return data;
  },

  getSummary: async (): Promise<StateSummaryResponse> => {
    const { data } = await api.get<StateSummaryResponse>(
      "/masters/states/summary",
    );

    return data;
  },

  create: async (
    payload: CreateStatePayload,
  ): Promise<CreateStateResponse> => {
    const { data } = await api.post<CreateStateResponse>(
      "/masters/states",
      payload,
    );

    return data;
  },

  updateStatus: async (
    id: string,
    payload: UpdateStateStatusPayload,
  ): Promise<UpdateStateStatusResponse> => {
    const { data } = await api.patch<UpdateStateStatusResponse>(
      `/masters/states/${id}/status`,
      payload,
    );

    return data;
  },
};
