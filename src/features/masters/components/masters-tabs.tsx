
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const MASTER_TABS = [
  { label: "State", value: "state" },
  { label: "District", value: "district" },
  { label: "Enquiry type", value: "enquiry-type" },
  { label: "Enquiry category", value: "enquiry-category" },
  { label: "Enquiry source", value: "enquiry-source" },
  { label: "Package", value: "package" },
  { label: "Vehicle type", value: "vehicle-type" },
  { label: "Meal plans", value: "meal-plans" },
  { label: "Itinerary", value: "itinerary" },
] as const;

export type MasterTab = (typeof MASTER_TABS)[number]["value"];

interface MastersTabsProps {
  activeTab: MasterTab;
}

export function MastersTabs({ activeTab }: MastersTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTabChange(tab: MasterTab) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/masters?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {MASTER_TABS.map((tab) => {
        const active = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-[#0879bd] text-white shadow-sm"
                : "bg-white text-[#263746] shadow-sm hover:bg-[#f3f7fa]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
