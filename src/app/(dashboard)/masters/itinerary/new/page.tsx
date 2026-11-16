
"use client";

import { useRouter } from "next/navigation";

import { ItineraryForm } from "@/features/masters/itinerary/components/itinerary-form";
import { useCreateItinerary } from "@/features/masters/itinerary/hooks/use-create-itinerary";

import type { CreateItineraryPayload } from "@/features/masters/itinerary/types/itinerary.types";

export default function NewItineraryPage() {
  const router = useRouter();
  const createMutation = useCreateItinerary();

  const handleSave = (payload: CreateItineraryPayload) => {
    createMutation.mutate(payload, {
      onSuccess: () => {
        router.push("/masters/itinerary");
      },
    });
  };

  return (
    <div>
      <ItineraryForm
        onSave={handleSave}
        isSaving={createMutation.isPending}
      />

      {createMutation.isError && (
        <p className="mt-4 text-sm text-red-500">
          {createMutation.error instanceof Error
            ? createMutation.error.message
            : "Failed to create itinerary"}
        </p>
      )}
    </div>
  );
}
