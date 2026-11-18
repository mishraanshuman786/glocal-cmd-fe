"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const masterTabs = [
  { label: "State", slug: "state" },
  { label: "District", slug: "district" },
  { label: "Enquiry type", slug: "enquiry-type" },
  { label: "Enquiry category", slug: "enquiry-category" },
  { label: "Enquiry source", slug: "enquiry-source" },
  { label: "Package", slug: "package" },
  { label: "Vehicle type", slug: "vehicle-type" },
  { label: "Meal Plans", slug: "meal-plans" },
  { label: "Itinerary", slug: "itinerary" },
];

export default function MastersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-[#10243a]">Masters</h1>
        <p className="text-sm text-[#718096]">
          Manage master data used across the CRM.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {masterTabs.map((tab) => {
          const active = pathname.startsWith(
            `/masters/${tab.slug}`,
          );

          return (
            <Link
              key={tab.slug}
              href={`/masters/${tab.slug}`}
              className={`
                shrink-0 rounded-full px-5 py-2.5 text-sm font-medium
                shadow-sm transition-colors
                ${
                  active
                    ? "bg-[#0879bd] text-white"
                    : "bg-white text-[#263746] hover:bg-slate-100"
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}