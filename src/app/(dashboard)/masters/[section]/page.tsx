import Link from "next/link";
import { notFound } from "next/navigation";

const sections: Record<string, string> = {
  state: "State",
  district: "District",
  "enquiry-type": "Enquiry type",
  "enquiry-category": "Enquiry category",
  "enquiry-source": "Enquiry source",
  package: "Package",
  "vehicle-type": "Vehicle type",
  "meal-plans": "Meal plans",
};

export default async function MasterSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const title = sections[section];

  if (!title) notFound();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#10243a]">Masters</h1>
        <p className="text-sm text-slate-500">
          Manage reusable CRM reference data
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-[#10243a]">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">
          This master section will be implemented next.
        </p>

        <Link
          href="/masters/itinerary"
          className="mt-5 inline-flex rounded-lg bg-[#0879bd] px-4 py-2 text-sm font-medium text-white"
        >
          Go to Itinerary
        </Link>
      </div>
    </div>
  );
}