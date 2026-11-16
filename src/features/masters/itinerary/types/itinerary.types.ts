
export type ItineraryStatus = "ACTIVE" | "INACTIVE";

// ============================================
// Backend response types (IDs included)
// ============================================

export interface ItineraryActivity {
  id: string;
  title: string;
  order: number;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  activities: ItineraryActivity[];
}

// ============================================
// Create request types (NO IDs)
// ============================================

export interface CreateItineraryActivity {
  title: string;
  order: number;
}

export interface CreateItineraryDay {
  dayNumber: number;
  title: string;
  activities: CreateItineraryActivity[];
}

export interface CreateItineraryPayload {
  title: string;
  days: CreateItineraryDay[];
}

// ============================================
// Update request types
// ============================================

export interface UpdateItineraryStatusRequest {
  status: ItineraryStatus;
}

// ============================================
// List response types
// ============================================

export interface ItineraryListItem {
  id: string;
  title: string;
  status: ItineraryStatus;
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
  status?: ItineraryStatus;
}

// ============================================
// Detail response types
// ============================================

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

// Compatibility with existing mock imports, if needed
export type Itinerary = ItineraryDetails;
