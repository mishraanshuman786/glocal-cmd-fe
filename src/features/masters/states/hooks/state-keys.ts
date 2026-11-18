
import type { GetStatesParams } from "../types/state.types";

export const stateKeys = {
  all: ["states"] as const,

  lists: () => [...stateKeys.all, "list"] as const,

  list: (params: GetStatesParams) =>
    [...stateKeys.lists(), params] as const,

  details: () => [...stateKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...stateKeys.details(), id] as const,

  summary: () => [...stateKeys.all, "summary"] as const,
};
