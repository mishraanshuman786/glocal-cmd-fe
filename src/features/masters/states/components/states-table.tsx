"use client";

import type { State, StateRegion } from "../types/state.types";

interface StatesTableProps {
  states: State[];
  page: number;
  pageSize: number;
  isUpdating: boolean;
  onStatusChange: (
    id: string,
    currentStatus: boolean,
  ) => void;
}

const regionLabels: Record<StateRegion, string> = {
  NORTH: "North",
  SOUTH: "South",
  EAST: "East",
  WEST: "West",
  NORTH_EAST: "North East",
};

const regionColors: Record<StateRegion, string> = {
  NORTH: "bg-violet-100 text-violet-700",
  SOUTH: "bg-green-100 text-green-700",
  EAST: "bg-amber-100 text-amber-700",
  WEST: "bg-red-100 text-red-700",
  NORTH_EAST: "bg-blue-100 text-blue-700",
};

export function StatesTable({
  states,
  page,
  pageSize,
  isUpdating,
  onStatusChange,
}: StatesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-[#e6edf3] text-xs uppercase text-[#718096]">
            <th className="px-1 py-3 font-medium">#</th>
            <th className="px-3 py-3 font-medium">State</th>
            <th className="px-3 py-3 font-medium">Region</th>
            <th className="px-3 py-3 font-medium">Districts</th>
            <th className="px-3 py-3 font-medium">Active</th>
            <th className="px-3 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {states.map((state, index) => (
            <tr
              key={state.id}
              className="border-b border-[#e6edf3] last:border-0"
            >
              <td className="px-1 py-4 text-sm text-[#718096]">
                {(page - 1) * pageSize + index + 1}
              </td>

              <td className="px-3 py-4 text-sm font-semibold text-[#10243a]">
                {state.name}
              </td>

              <td className="px-3 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${regionColors[state.region]}`}
                >
                  {regionLabels[state.region]}
                </span>
              </td>

              <td className="px-3 py-4 text-sm text-[#263746]">
                {state.districtCount}
              </td>

              <td className="px-3 py-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={state.isActive}
                  aria-label={`Set ${state.name} ${
                    state.isActive ? "inactive" : "active"
                  }`}
                  disabled={isUpdating}
                  onClick={() =>
                    onStatusChange(state.id, state.isActive)
                  }
                  className={`relative h-6 w-11 rounded-full transition disabled:opacity-50 ${
                    state.isActive
                      ? "bg-green-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                      state.isActive ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </td>

              <td className="px-3 py-4">
                <button
                  type="button"
                  disabled
                  title="District management will be implemented next"
                  className="rounded-lg border border-[#168dcc] px-4 py-2 text-xs font-semibold text-[#0879bd] opacity-60"
                >
                  + District
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}