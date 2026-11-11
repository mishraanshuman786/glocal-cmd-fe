"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  FileUp,
  Pencil,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

import { ItineraryTabs } from "@/features/masters/itinerary/components/itinerary-tabs";
import { mockItineraries } from "@/features/masters/itinerary/data/mock-itineraries";
import type { Itinerary } from "@/features/masters/itinerary/types/itinerary.types";
type StatusFilter = "ALL" | "ACTIVE" | "INACTIVE" | "DRAFT";

export default function ItineraryPage() {
  const [itineraries, setItineraries] =
    useState<Itinerary[]>(mockItineraries);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;

  const filteredItineraries = useMemo(() => {
    return itineraries.filter((itinerary) => {
      const matchesSearch = itinerary.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        itinerary.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [itineraries, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItineraries.length / pageSize),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItineraries = filteredItineraries.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );

  function handleToggle(id: string) {
    setItineraries((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;

        const isActive = !item.isActive;

        return {
          ...item,
          isActive,
          status: isActive ? "ACTIVE" : "INACTIVE",
        };
      }),
    );
  }

  function handleCopy(itinerary: Itinerary) {
    const copy: Itinerary = {
      ...itinerary,
      id: crypto.randomUUID(),
      title: `${itinerary.title} (Copy)`,
      isActive: false,
      status: "DRAFT",
      days: itinerary.days.map((day) => ({ ...day })),
    };

    setItineraries((previous) => [...previous, copy]);
    setStatusFilter("ALL");
    setSearch("");
    setCurrentPage(
      Math.ceil((itineraries.length + 1) / pageSize),
    );
  }

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusChange(value: StatusFilter) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-[30px] font-bold leading-tight text-[#10243a]">
            Masters
          </h1>
          <p className="text-sm text-[#64768b]">
            Day-by-day plans that fill quotations automatically
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#263746] shadow-sm transition hover:bg-slate-50">
            <FileUp size={17} />
            Import from Word or PDF
            <input
              type="file"
              accept=".doc,.docx,.pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  alert(
                    `Selected ${file.name}. Import processing will be implemented later.`,
                  );
                }
                event.target.value = "";
              }}
            />
          </label>

          <Link
            href="/masters/itinerary/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff851b] px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#f4770b]"
          >
            <Plus size={18} />
            Add itinerary
          </Link>
        </div>
      </div>

      {/* Master tabs */}
      <ItineraryTabs />

      {/* Itinerary table */}
      <section className="overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_8px_30px_rgba(31,54,78,0.07)] sm:p-5">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative w-full sm:max-w-[330px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search itinerary title"
              className="h-11 w-full rounded-xl border border-[#d5dfeb] bg-white pl-11 pr-4 text-sm text-[#24364a] outline-none transition placeholder:text-slate-400 focus:border-[#1682bd] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative w-full sm:w-[145px]">
            <select
              value={statusFilter}
              onChange={(event) =>
                handleStatusChange(event.target.value as StatusFilter)
              }
              className="h-11 w-full appearance-none rounded-full border border-[#d5dfeb] bg-white px-4 pr-10 text-sm text-[#24364a] shadow-sm outline-none focus:border-[#1682bd]"
            >
              <option value="ALL">All status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DRAFT">Draft</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
        </div>

        {/* Table header */}
        <div className="hidden grid-cols-[1.2fr_0.6fr_1.8fr_0.55fr_0.55fr] gap-4 border-b border-[#e5ebf2] px-1 pb-4 text-[13px] font-medium uppercase text-[#718096] lg:grid">
          <span>Itinerary</span>
          <span>Duration</span>
          <span>Day plan</span>
          <span>Active</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        <div>
          {paginatedItineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="grid gap-4 border-b border-[#e8edf3] px-1 py-5 last:border-b-0 lg:grid-cols-[1.2fr_0.6fr_1.8fr_0.55fr_0.55fr] lg:items-center"
            >
              {/* Title */}
              <div>
                <p className="font-semibold text-[#10243a]">
                  {itinerary.title}
                </p>
                <span className="mt-1 inline-block text-xs text-slate-500 lg:hidden">
                  Itinerary
                </span>
              </div>

              {/* Duration */}
              <div>
                <p className="font-semibold text-[#10243a]">
                  {itinerary.duration}
                </p>
                <p className="text-sm text-[#718096]">
                  {itinerary.activities} activities
                </p>
              </div>

              {/* Day plan */}
              <div className="space-y-1">
                {itinerary.days.slice(0, 2).map((day) => (
                  <div
                    key={day.day}
                    className="flex items-start gap-2 text-sm text-[#263746]"
                  >
                    <span className="shrink-0 rounded-md bg-[#dceaff] px-2 py-0.5 text-xs font-semibold text-[#2455b8]">
                      Day {day.day}
                    </span>

                    <span>{day.title}</span>
                  </div>
                ))}

                {itinerary.days.length > 2 && (
                  <p className="pl-[58px] text-sm text-[#718096]">
                    +{itinerary.days.length - 2} more days
                  </p>
                )}
              </div>

              {/* Active toggle */}
              <div className="flex items-center justify-between lg:justify-start">
                <span className="text-sm text-slate-500 lg:hidden">
                  Active
                </span>

                <button
                  type="button"
                  role="switch"
                  aria-checked={itinerary.isActive}
                  aria-label={`Toggle ${itinerary.title}`}
                  onClick={() => handleToggle(itinerary.id)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    itinerary.isActive
                      ? "bg-[#16a34a]"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      itinerary.isActive
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href={`/masters/itinerary/${itinerary.id}/edit`}
                  className="inline-flex items-center gap-1 text-[#64768b] hover:text-[#0879bd]"
                >
                  <Pencil size={14} className="lg:hidden" />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() => handleCopy(itinerary)}
                  className="inline-flex items-center gap-1 text-[#64768b] hover:text-[#0879bd]"
                >
                  <Copy size={14} className="lg:hidden" />
                  Copy
                </button>
              </div>
            </div>
          ))}

          {paginatedItineraries.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-semibold text-[#263746]">
                No itineraries found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        {/* Footer / pagination */}
        <div className="flex flex-col justify-between gap-3 border-t border-[#e8edf3] pt-4 text-sm text-[#718096] sm:flex-row sm:items-center">
          <p>
            Showing{" "}
            {filteredItineraries.length === 0
              ? 0
              : (safeCurrentPage - 1) * pageSize + 1}
            –
            {Math.min(safeCurrentPage * pageSize, filteredItineraries.length)}{" "}
            of {filteredItineraries.length} itineraries.
            <span className="hidden sm:inline">
              {" "}Imported itineraries are saved as drafts until you review them.
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span>
              {safeCurrentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}