import { notFound } from "next/navigation";

const modules: Record<string, string> = {
  leads: "Leads",
  pipeline: "Pipeline",
  "follow-ups": "Follow-ups",
  quotations: "Quotations",
  bookings: "Bookings",
  "hotels-vehicles": "Hotels and Vehicles",
  payments: "Payments",
  "post-trip-review": "Post Trip Review",
  "users-access": "Users and Access",
  reports: "Reports",
  settings: "Settings",
};

export default async function ModulePlaceholderPage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const title = modules[module];

  if (!title) notFound();

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-[#10243a]">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">
        This module will be implemented in a future development phase.
      </p>
    </div>
  );
}