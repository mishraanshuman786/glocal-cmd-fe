"use client";

interface ItinerarySummaryProps {
  totalDays: number;
  totalActivities: number;
  hasUnsavedChanges: boolean;
}

export function ItinerarySummary({
  totalDays,
  totalActivities,
  hasUnsavedChanges,
}: ItinerarySummaryProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-[20px] bg-gradient-to-br from-[#075b98] to-[#168fc9] p-5 text-white shadow-sm">
        <p className="text-sm">Summary</p>

        <h2 className="mt-1 text-2xl font-bold leading-tight">
          {totalDays} days · {totalActivities} activities
        </h2>

        <p className="mt-1 text-sm">
          {hasUnsavedChanges ? "Unsaved changes" : "No changes yet"}
        </p>
      </section>

      <section className="rounded-[20px] bg-white p-5 shadow-sm">
        <h3 className="font-bold text-[#172b42]">Fill faster</h3>

        <p className="mt-2 text-sm leading-5 text-[#718096]">
          Upload a Word or PDF itinerary. We will split it into
          days for you to review before saving.
        </p>

        <p className="mt-3 rounded-xl border border-[#d3dfeb] px-3 py-3 text-center text-sm text-[#26394f]">
          Import from file (coming soon)
        </p>
      </section>

      <section className="rounded-[20px] bg-white p-5 shadow-sm">
        <h3 className="font-bold text-[#172b42]">Good to know</h3>

        <p className="mt-2 text-sm leading-5 text-[#718096]">
          Add one activity per line. Hotel, meals and price
          details can be added later when creating a quotation.
        </p>
      </section>
    </div>
  );
}