"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useItineraries } from "@/features/masters/itinerary/hooks/use-itineraries";
import { useUpdateItineraryStatus } from "@/features/masters/itinerary/hooks/use-update-itinerary-status";
import { useCopyItinerary } from "@/features/masters/itinerary/hooks/use-copy-itinerary";

import type { ItineraryStatus } from "@/features/masters/itinerary/types/itinerary.types";

import { CustomSelect } from "@/components/ui/custom-select";
import { TextInputModal } from "@/components/ui/text-input-modal";

type StatusFilter = "ALL" | ItineraryStatus;

const PAGE_SIZE = 4;

export default function ItineraryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedItinerary, setSelectedItinerary] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const queryParams = {
    page: currentPage,
    limit: PAGE_SIZE,
    ...(search.trim() ? { search: search.trim() } : {}),
    ...(statusFilter !== "ALL" ? { status: statusFilter } : {}),
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isPlaceholderData,
  } = useItineraries(queryParams);

  const statusMutation = useUpdateItineraryStatus();
  const copyMutation = useCopyItinerary();

  const itineraries = data?.data ?? [];
  const pagination = data?.pagination;

  useEffect(() => {
    if (
      pagination &&
      currentPage > pagination.totalPages &&
      pagination.totalPages > 0
    ) {
      setCurrentPage(pagination.totalPages);
    }
  }, [pagination, currentPage]);

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusFilter(value: StatusFilter) {
    setStatusFilter(value);
    setCurrentPage(1);
  }

  function handleStatusChange(
    id: string,
    currentStatus: ItineraryStatus,
  ) {
    const nextStatus: ItineraryStatus =
      currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    statusMutation.mutate({
      id,
      status: {
        status: nextStatus,
      },
    });
  }

  function handleCopy(id: string, title: string) {
    copyMutation.reset();

    setSelectedItinerary({ id, title });
  }

  async function handleConfirmCopy(newTitle: string) {
    const title = newTitle.trim();

    if (!selectedItinerary || !title) return;

    try {
      await copyMutation.mutateAsync({
        id: selectedItinerary.id,
        title,
      });

      setSelectedItinerary(null);
    } catch {
      // Keep the modal open so the user can retry.
    }
  }

  function handleCloseCopyModal() {
    if (copyMutation.isPending) return;

    setSelectedItinerary(null);
    copyMutation.reset();
  }

  const totalPages = Math.max(1, pagination?.totalPages ?? 1);
  const totalRecords = pagination?.total ?? 0;

  if (isLoading && !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm font-medium text-[#718096]">
          Loading itineraries...
        </p>
      </div>
    );
  }

  if (isError && !data) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-red-500">
          {error instanceof Error
            ? error.message
            : "Unable to load itineraries"}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-[#0879bd] px-4 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-5">
      {/* Page actions */}
      <div className="flex flex-col justify-end gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            accept=".doc,.docx,.pdf"
            className="hidden"
            id="itinerary-import"
            onChange={(event) =>
              setSelectedFile(event.target.files?.[0] ?? null)
            }
          />

          <label
            htmlFor="itinerary-import"
            title={selectedFile?.name ?? "Select a Word or PDF file"}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-5 py-3 text-sm font-medium text-[#263746] shadow-sm transition hover:bg-slate-50"
          >
            <span>⇧</span>
            {selectedFile
              ? selectedFile.name
              : "Import from Word or PDF"}
          </label>

          <Link
            href="/masters/itinerary/new"
            className="rounded-xl bg-[#ff851b] px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#f4770b]"
          >
            + Add itinerary
          </Link>
        </div>
      </div>

      {/* Itinerary listing */}
      <section className="overflow-hidden rounded-[20px] bg-white p-4 shadow-[0_8px_24px_rgba(15,39,66,0.06)] sm:p-5">
        {/* Search and filter */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:max-w-[330px]">
            <input
              type="text"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="Search itinerary title"
              className="h-11 w-full rounded-xl border border-[#d3dfeb] bg-white px-4 text-sm text-[#263746] outline-none transition placeholder:text-[#8b929b] focus:border-[#168dcc] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <CustomSelect
            value={statusFilter}
            onChange={(value) =>
              handleStatusFilter(value as StatusFilter)
            }
            ariaLabel="Filter itineraries by status"
            className="sm:w-[155px]"
            options={[
              { label: "All status", value: "ALL" },
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ]}
          />
        </div>

        {isFetching && (
          <div className="mb-3 flex items-center gap-2 text-xs text-[#718096]">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#d3dfeb] border-t-[#0879bd]" />
            Updating itineraries...
          </div>
        )}

        {isError && data && (
          <p className="mb-3 text-sm text-red-500">
            Unable to refresh itineraries. Showing the previous results.
          </p>
        )}

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[850px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-[#e4ebf2] text-left text-[13px] font-medium uppercase text-[#718096]">
                <th className="w-[26%] px-1 pb-4 font-medium">
                  Itinerary
                </th>
                <th className="w-[14%] px-2 pb-4 font-medium">
                  Duration
                </th>
                <th className="w-[38%] px-2 pb-4 font-medium">
                  Day plan
                </th>
                <th className="w-[12%] px-2 pb-4 text-center font-medium">
                  Active
                </th>
                <th className="w-[10%] px-2 pb-4" />
              </tr>
            </thead>

            <tbody>
              {itineraries.map((item) => {
                const active = item.status === "ACTIVE";

                return (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4ebf2] last:border-b-0"
                  >
                    <td className="px-1 py-5">
                      <Link
                        href={`/masters/itinerary/${item.id}`}
                        className="font-bold text-[#10243a] transition hover:text-[#0879bd]"
                      >
                        {item.title}
                      </Link>
                    </td>

                    <td className="px-2 py-5">
                      <p className="font-bold text-[#10243a]">
                        {item.durationsDays}{" "}
                        {item.durationsDays === 1 ? "day" : "days"}
                      </p>
                      <p className="text-sm text-[#718096]">
                        {item.totalActivities} activities
                      </p>
                    </td>

                    <td className="px-2 py-5">
                      <div className="space-y-1">
                        {item.days?.slice(0, 2).map((day) => (
                          <div
                            key={day.id}
                            className="flex items-start gap-2"
                          >
                            <span className="shrink-0 rounded-md bg-[#dceaff] px-2 py-0.5 text-xs font-bold text-[#2457c5]">
                              Day {day.dayNumber}
                            </span>
                            <span className="text-sm leading-5 text-[#263746]">
                              {day.title}
                            </span>
                          </div>
                        ))}

                        {item.durationsDays > 2 && (
                          <p className="text-sm text-[#718096]">
                            +{item.durationsDays - 2} more days
                          </p>
                        )}

                        {item.durationsDays === 0 && (
                          <span className="text-sm text-[#a0aec0]">
                            No day plans added
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-2 py-5 text-center">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={active}
                        aria-label={`Set ${item.title} ${
                          active ? "inactive" : "active"
                        }`}
                        disabled={statusMutation.isPending}
                        onClick={() =>
                          handleStatusChange(item.id, item.status)
                        }
                        className={`relative inline-flex h-6 w-[43px] items-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          active ? "bg-[#16a34a]" : "bg-[#cbd5e1]"
                        }`}
                      >
                        <span
                          className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition ${
                            active
                              ? "translate-x-[22px]"
                              : "translate-x-[3px]"
                          }`}
                        />
                      </button>
                    </td>

                    <td className="px-2 py-5 text-right whitespace-nowrap">
                      <Link
                        href={`/masters/itinerary/${item.id}`}
                        className="text-sm text-[#718096] transition hover:text-[#0879bd]"
                      >
                        Edit
                      </Link>

                      <span className="px-1 text-[#a0aec0]">·</span>

                      <button
                        type="button"
                        disabled={copyMutation.isPending}
                        onClick={() =>
                          handleCopy(item.id, item.title)
                        }
                        className="text-sm text-[#718096] transition hover:text-[#0879bd] disabled:opacity-50"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 md:hidden">
          {itineraries.map((item) => {
            const active = item.status === "ACTIVE";

            return (
              <div
                key={item.id}
                className="rounded-xl border border-[#e4ebf2] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/masters/itinerary/${item.id}`}
                    className="font-bold text-[#10243a]"
                  >
                    {item.title}
                  </Link>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={active}
                    aria-label={`Set ${item.title} ${
                      active ? "inactive" : "active"
                    }`}
                    disabled={statusMutation.isPending}
                    onClick={() =>
                      handleStatusChange(item.id, item.status)
                    }
                    className={`relative inline-flex h-6 w-[43px] shrink-0 items-center rounded-full disabled:opacity-50 ${
                      active ? "bg-[#16a34a]" : "bg-[#cbd5e1]"
                    }`}
                  >
                    <span
                      className={`inline-block h-[18px] w-[18px] rounded-full bg-white transition ${
                        active
                          ? "translate-x-[22px]"
                          : "translate-x-[3px]"
                      }`}
                    />
                  </button>
                </div>

                <p className="mt-2 text-sm text-[#718096]">
                  {item.durationsDays} days · {item.totalActivities} activities
                </p>

                <div className="mt-3 space-y-2">
                  {item.days?.slice(0, 2).map((day) => (
                    <p
                      key={day.id}
                      className="text-sm text-[#263746]"
                    >
                      <span className="mr-2 rounded-md bg-[#dceaff] px-2 py-0.5 text-xs font-bold text-[#2457c5]">
                        Day {day.dayNumber}
                      </span>
                      {day.title}
                    </p>
                  ))}

                  {item.durationsDays > 2 && (
                    <p className="text-sm text-[#718096]">
                      +{item.durationsDays - 2} more days
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-end gap-3 border-t border-[#e4ebf2] pt-3">
                  <Link
                    href={`/masters/itinerary/${item.id}`}
                    className="text-sm text-[#718096]"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopy(item.id, item.title)
                    }
                    disabled={copyMutation.isPending}
                    className="text-sm text-[#718096] disabled:opacity-50"
                  >
                    Copy
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {itineraries.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-semibold text-[#263746]">
              No itineraries found
            </p>
            <p className="mt-1 text-sm text-[#718096]">
              Try changing your search or status filter.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#e4ebf2] pt-4 text-sm text-[#718096] sm:flex-row sm:items-center">
          <p>
            Showing{" "}
            {totalRecords === 0
              ? 0
              : (currentPage - 1) * PAGE_SIZE + 1}
            {"–"}
            {Math.min(currentPage * PAGE_SIZE, totalRecords)}
            {" of "}
            {totalRecords} itineraries
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={
                currentPage <= 1 || isFetching || isPlaceholderData
              }
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              className="rounded-lg border border-[#d3dfeb] px-3 py-1.5 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span className="min-w-[65px] text-center">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={
                currentPage >= totalPages ||
                isFetching ||
                isPlaceholderData
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1),
                )
              }
              className="rounded-lg border border-[#d3dfeb] px-3 py-1.5 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        {/* Mutation feedback */}
        {statusMutation.isError && (
          <p className="mt-3 text-sm text-red-500">
            Failed to update itinerary status. Please try again.
          </p>
        )}

        {copyMutation.isError && (
          <p className="mt-3 text-sm text-red-500">
            Failed to copy itinerary. Please try again.
          </p>
        )}

        {statusMutation.isSuccess && (
          <p className="mt-3 text-sm text-green-600">
            Itinerary status updated successfully.
          </p>
        )}

        {copyMutation.isSuccess && (
          <p className="mt-3 text-sm text-green-600">
            Itinerary copied successfully.
          </p>
        )}
      </section>

      {/* Copy modal */}
      <TextInputModal
        isOpen={selectedItinerary !== null}
        title="Copy Itinerary"
        description={
          selectedItinerary
            ? `Enter a new title for the copy of "${selectedItinerary.title}".`
            : undefined
        }
        inputLabel="New itinerary title"
        placeholder="Enter the new itinerary title"
        initialValue=""
        confirmText="OK"
        cancelText="Cancel"
        isLoading={copyMutation.isPending}
        onConfirm={handleConfirmCopy}
        onClose={handleCloseCopyModal}
      />
    </div>
  );
}