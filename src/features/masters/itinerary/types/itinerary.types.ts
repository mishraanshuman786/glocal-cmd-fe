export type ItineraryStatus="ACTIVE"|"INACTIVE";

export interface ItineraryActivity{
    id?:string;
    title:string;
    order:number;
}

export interface ItineraryDay {
    id?:string;
    dayNumber:number;
    title:string;
    activities:ItineraryActivity[];
}


export interface CreateItineraryPayload{
    title:string;
    days:ItineraryDay[];
    };


export interface UpdateItineraryStatusRequest{
    status:"ACTIVE"|"INACTIVE";
}

export interface ItineraryListItem {
  id: string;
  title: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;

  durationsDays: number;
  totalActivities: number;

  days: {
    id: string;
    dayNumber: number;
    title: string;
  }[];
}

export interface ItineraryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ItineraryListResponse {
  success: boolean;
  message: string;
  data: ItineraryListItem[];
  pagination: ItineraryPagination;
}

export interface GetItinerariesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ACTIVE" | "INACTIVE";
}

// Itineray detail types
export interface ItineraryDetails {
  id: string;
  title: string;
  status: ItineraryStatus;
  createdAt: string;
  updatedAt: string;
  durationDays: number;
  totalActivities: number;
  days: ItineraryDay[];
}

export interface ItineraryDetailsResponse {
  success: boolean;
  message: string;
  data: ItineraryDetails;
}