"use client";

import { useState } from "react";

import { StateSummaryCards } from "@/features/masters/states/components/state-summary-cards";
import { StateFilters } from "@/features/masters/states/components/state-filters";
import { StatesTable } from "@/features/masters/states/components/states-table";
import { StatesPagination } from "@/features/masters/states/components/state-pagination";
import { CreateStateModal } from "@/features/masters/states/components/create-state-modal";

import { useCreateState } from "@/features/masters/states/hooks/use-create-state";
import { useStateSummary } from "@/features/masters/states/hooks/use-state-summary";
import { useStates } from "@/features/masters/states/hooks/use-states";
import { useUpdateStateStatus } from "@/features/masters/states/hooks/use-update-state-status";

import type {
  CreateStatePayload,
  StateRegion,
  GetStatesParams,
} from "@/features/masters/states/types/state.types";

const PAGE_SIZE = 6;

export default function StatePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const params: GetStatesParams = {
    search: search.trim() || undefined,
    region: region === "ALL" ? undefined : (region as StateRegion),
    isActive: status === "ALL" ? undefined : status === "ACTIVE",
    page,
    limit: PAGE_SIZE,
  };

  const statesQuery = useStates(params);
  const summaryQuery = useStateSummary();

  const createMutation = useCreateState();
  const statusMutation = useUpdateStateStatus();

  const states = statesQuery.data?.data ?? [];
  const pagination = statesQuery.data?.pagination;
  const summary = summaryQuery.data?.data;

  async function handleCreate(payload: CreateStatePayload) {
    try {
      await createMutation.mutateAsync(payload);
      setIsCreateOpen(false);
    } catch {
      // Error is displayed inside CreateStateModal.
    }
  }

  async function handleStatusChange(
    id: string,
    currentStatus: boolean,
  ) {
    try {
      await statusMutation.mutateAsync({
        id,
        payload: { isActive: !currentStatus },
      });
    } catch {
      // Mutation error can be handled here if needed.
    }
  }

  function handleFilterChange(
    key: "search" | "region" | "status",
    value: string,
  ) {
    if (key === "search") setSearch(value);
    if (key === "region") setRegion(value);
    if (key === "status") setStatus(value);

    setPage(1);
  }

  return (
    <div className="space-y-5">
      {/* Header action */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            createMutation.reset();
            setIsCreateOpen(true);
          }}
          className="rounded-xl bg-[#ff851b] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#f4770b]"
        >
          + Add state
        </button>
      </div>

      {/* Summary */}
      <StateSummaryCards summary={summary} />

      {/* Listing */}
      <section className="rounded-[20px] bg-white p-4 shadow-sm sm:p-5">
        <StateFilters
          search={search}
          region={region}
          status={status}
          onSearchChange={(value) =>
            handleFilterChange("search", value)
          }
          onRegionChange={(value) =>
            handleFilterChange("region", value)
          }
          onStatusChange={(value) =>
            handleFilterChange("status", value)
          }
        />

        {statesQuery.isLoading ? (
          <div className="py-12 text-center text-sm text-[#718096]">
            Loading states...
          </div>
        ) : statesQuery.isError ? (
          <div className="py-12 text-center text-sm text-red-500">
            Failed to load states. Please try again.

            <button
              type="button"
              onClick={() => statesQuery.refetch()}
              className="ml-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        ) : states.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-semibold text-[#263746]">
              No states found
            </p>
            <p className="mt-1 text-sm text-[#718096]">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <StatesTable
              states={states}
              page={page}
              pageSize={PAGE_SIZE}
              isUpdating={statusMutation.isPending}
              onStatusChange={handleStatusChange}
            />

            <StatesPagination
              page={page}
              totalPages={pagination?.totalPages ?? 1}
              total={pagination?.total ?? 0}
              pageSize={PAGE_SIZE}
              isFetching={statesQuery.isFetching}
              onPageChange={setPage}
            />
          </>
        )}
      </section>

      {/* Create modal */}
      <CreateStateModal
        isOpen={isCreateOpen}
        isSubmitting={createMutation.isPending}
        error={
          createMutation.isError
            ? createMutation.error instanceof Error
              ? createMutation.error.message
              : "Failed to create state."
            : undefined
        }
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}