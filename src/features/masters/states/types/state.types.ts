
export type StateRegion =
  | "NORTH"
  | "SOUTH"
  | "EAST"
  | "WEST"
  | "NORTH_EAST";


export interface State {
  id: string;
  name: string;
  region: StateRegion;
  isActive: boolean;
  districtCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStatePayload {
  name: string;
  region: StateRegion;
}

export interface UpdateStateStatusPayload {
  isActive: boolean;
}

export interface GetStatesParams {
  search?: string;
  region?: StateRegion | "ALL";
  isActive?:boolean;
  page?: number;
  limit?: number;
}

export interface StatesPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface StatesListResponse {
  success: boolean;
  message: string;
  data: State[];
  pagination: StatesPagination;
}

export interface StateDetailsResponse {
  success: boolean;
  message: string;
  data: State;
}

export interface StateSummary {
  totalStates: number;
  totalDistricts: number;
  inactiveStates: number;
}

export interface StateSummaryResponse {
  success: boolean;
  message: string;
  data: StateSummary;
}

export interface CreateStateResponse {
  success: boolean;
  message: string;
  data: State;
}

export interface UpdateStateStatusResponse {
  success: boolean;
  message: string;
  data: State;
}
