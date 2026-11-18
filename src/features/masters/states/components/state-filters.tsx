"use client";

import { CustomSelect } from "@/components/ui/custom-select";

interface StateFiltersProps {
  search: string;
  region: string;
  status: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const regionOptions = [
  { label: "All regions", value: "ALL" },
  { label: "North", value: "NORTH" },
  { label: "South", value: "SOUTH" },
  { label: "East", value: "EAST" },
  { label: "West", value: "WEST" },
  { label: "North East", value: "NORTH_EAST" },
];

const statusOptions = [
  { label: "All status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];

export function StateFilters({
  search,
  region,
  status,
  onSearchChange,
  onRegionChange,
  onStatusChange,
}: StateFiltersProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search state"
        className="h-11 min-w-0 flex-1 rounded-xl border border-[#d3dfeb] bg-white px-4 text-sm text-[#263746] outline-none transition placeholder:text-[#8b929b] focus:border-[#168dcc] focus:ring-2 focus:ring-blue-100"
      />

      <div className="w-full sm:w-40">
        <CustomSelect
          options={regionOptions}
          value={region}
          onChange={onRegionChange}
          ariaLabel="Filter by region"
          placeholder="All regions"
        />
      </div>

      <div className="w-full sm:w-40">
        <CustomSelect
          options={statusOptions}
          value={status}
          onChange={onStatusChange}
          ariaLabel="Filter by status"
          placeholder="All status"
        />
      </div>
    </div>
  );
}