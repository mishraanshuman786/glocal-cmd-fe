import Link from "next/link";

export default async function EditItineraryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-5">
      <Link
        href="/masters/itinerary"
        className="text-sm text-[#0879bd] hover:underline"
      >
        ← Back to itineraries
      </Link>

      <h1 className="text-3xl font-bold text-[#10243a]">
        Edit itinerary
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-600">
          Editing itinerary: {id}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          The edit form will be implemented with the itinerary builder.
        </p>
      </div>
    </div>
  );
}