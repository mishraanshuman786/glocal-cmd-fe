"use client";

import { useQuery } from "@tanstack/react-query";

import { stateApi } from "@/lib/api/state.api";
import { stateKeys } from "./state-keys";

import type { GetStatesParams } from "../types/state.types";

export function useStates(params: GetStatesParams) {
  return useQuery({
    queryKey: stateKeys.list(params),
    queryFn: () => stateApi.getAll(params),
  });
}