import type { StateSummary } from "../types/state.types";

interface StateSummaryCardsProps {
  summary?: StateSummary;
}

const summaryCards = [
  {
    key: "totalStates",
    label: "States and UTs",
    borderColor: "border-t-[#0879bd]",
  },
  {
    key: "totalDistricts",
    label: "Districts",
    borderColor: "border-t-[#16a34a]",
  },
  {
    key: "inactiveStates",
    label: "Inactive states",
    borderColor: "border-t-[#ff851b]",
  },
] as const;

export function StateSummaryCards({
  summary,
}: StateSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {summaryCards.map((card) => (
        <div
          key={card.key}
          className={`rounded-[20px] border-t-4 ${card.borderColor} bg-white p-5 shadow-sm`}
        >
          <p className="text-sm text-[#718096]">
            {card.label}
          </p>

          <p className="mt-1 text-3xl font-bold text-[#10243a]">
            {(summary?.[card.key] ?? 0).toLocaleString("en-IN")}
          </p>
        </div>
      ))}
    </div>
  );
}