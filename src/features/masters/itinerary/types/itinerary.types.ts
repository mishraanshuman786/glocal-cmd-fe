export type ItineraryStatus="ACTIVE"|"INACTIVE"|"DRAFT";

export interface ItineraryActivity{
    id:string;
    title:string;
    order:number;
}

export interface ItineraryDay {
    id:string;
    dayNumber:number;
    title:string;
    activities:ItineraryActivity[];
}

export interface Itinerary {
  id: string;
  title: string;
  days: ItineraryDay[];
  isActive: boolean;
  status: ItineraryStatus;
  createdAt?:string;
  updatedAt?:string;
}

export interface CreateItineraryPayload{
    title:string;
    days:{
        dayNumber:number;
        title:string;
        activities:{
            title:string;
            order:number;
        }[];
    }[];
}