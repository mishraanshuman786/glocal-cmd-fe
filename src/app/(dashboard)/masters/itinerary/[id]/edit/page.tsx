'use client';

import { useParams } from 'next/navigation';
import { useItinerary } from '@/features/masters/itinerary/hooks/use-itinerary';

export default function ItineraryDetailsPage() {
  const params = useParams<{ id: string }>();

  const {
    data,
    isLoading,
    isError,
  } = useItinerary(params.id);

  if (isLoading) {
    return <p>Loading itinerary...</p>;
  }

  if (isError || !data) {
    return <p>Unable to load itinerary.</p>;
  }

  // Adjust according to your actual API response.
  const itinerary = data.data ?? data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {itinerary.title}
      </h1>

      {itinerary.days?.map((day: any) => (
        <section
          key={day.id ?? day.dayNumber}
          className="rounded-lg border p-4"
        >
          <h2 className="font-medium">
            Day {day.dayNumber}: {day.title}
          </h2>

          <ul className="mt-3 list-disc pl-5">
            {day.activities?.map((activity: any) => (
              <li key={activity.id ?? activity.order}>
                {activity.title}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}