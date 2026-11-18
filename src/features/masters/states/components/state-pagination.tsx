interface StatesPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

export function StatesPagination({
  page,
  totalPages,
  total,
  pageSize,
  isFetching,
  onPageChange,
}: StatesPaginationProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="mt-5 flex flex-col justify-between gap-3 text-sm text-[#718096] sm:flex-row sm:items-center">
      <span>
        Showing {start}–{end} of {total}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1 || isFetching}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
        >
          Previous
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages || isFetching}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border px-3 py-1.5 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}