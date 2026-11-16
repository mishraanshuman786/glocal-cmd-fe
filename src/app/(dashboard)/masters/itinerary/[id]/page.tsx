
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useItinerary } from '@/features/masters/itinerary/hooks/use-itinerary';
import type { ItineraryStatus } from '@/features/masters/itinerary/types/itinerary.types';

function formatDate(date: string) {
  if (!date) return '—';

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function StatusBadge({ status }: { status: ItineraryStatus }) {
  const styles: Record<ItineraryStatus, string> = {
    ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    INACTIVE: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status === 'ACTIVE' ? 'Active' : 'Inactive'}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e5edf4] bg-white p-3.5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5fc] text-[#168dcc]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-[#8493a2]">{label}</p>
        <p className="mt-0.5 text-xl font-semibold text-[#263746]">
          {value}
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200" />

      <div className="h-24 animate-pulse rounded-xl bg-slate-100" />

      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-20 animate-pulse rounded-xl bg-slate-100"
          />
        ))}
      </div>

      <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}

export default function ItineraryDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useItinerary(id);

  const itinerary = response?.data;

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#e5edf4] bg-white px-5 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <svg
            className="h-6 w-6 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.3 3.86 1.82 18.5A2 2 0 0 0 3.55 21h16.9a2 2 0 0 0 1.73-2.5L13.7 3.86a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <h2 className="font-semibold text-[#263746]">
          Unable to load itinerary
        </h2>

        <p className="mt-1 text-sm text-[#8493a2]">
          {error instanceof Error
            ? error.message
            : 'Something went wrong while fetching itinerary details.'}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => refetch()}
            className="rounded-full bg-[#168dcc] px-4 py-2 text-sm font-medium text-white hover:bg-[#117bb3]"
          >
            Try again
          </button>

          <button
            onClick={() => router.push('/masters/itinerary')}
            className="rounded-full border border-[#d3dfeb] px-4 py-2 text-sm font-medium text-[#263746] hover:bg-slate-50"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-[#e5edf4] bg-white px-5 text-center">
        <h2 className="font-semibold text-[#263746]">
          Itinerary not found
        </h2>

        <p className="mt-1 text-sm text-[#8493a2]">
          This itinerary may have been deleted or is no longer available.
        </p>

        <button
          onClick={() => router.push('/masters/itinerary')}
          className="mt-4 rounded-full bg-[#168dcc] px-4 py-2 text-sm font-medium text-white hover:bg-[#117bb3]"
        >
          Back to itineraries
        </button>
      </div>
    );
  }

  const days = itinerary.days ?? [];

  const totalActivities =
    itinerary.totalActivities ??
    days.reduce((total, day) => total + day.activities.length, 0);

  return (
    <div className="space-y-4 pb-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <button
            onClick={() => router.push('/masters/itinerary')}
            className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#8493a2] transition hover:text-[#168dcc]"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 18-6-6 6-6"
              />
            </svg>
            All itineraries
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="break-words text-xl font-semibold text-[#263746] sm:text-2xl">
              {itinerary.title}
            </h1>

            <StatusBadge status={itinerary.status} />
          </div>

          <p className="mt-1 text-xs text-[#8493a2]">
            Itinerary details and day-wise activity plan
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(`/masters/itinerary/${itinerary.id}/edit`)
          }
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#168dcc] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#117bb3]"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16 4 4 4M4 20l4-.8L19 8a2.12 2.12 0 0 0-3-3L5 16l-1 4Z"
            />
          </svg>
          Edit itinerary
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Total days"
          value={itinerary.durationDays ?? days.length}
          icon={
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 10h18" />
            </svg>
          }
        />

        <SummaryCard
          label="Total activities"
          value={totalActivities}
          icon={
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5h11M9 12h11M9 19h11M4 5h.01M4 12h.01M4 19h.01"
              />
            </svg>
          }
        />

        <SummaryCard
          label="Last updated"
          value={formatDate(itinerary.updatedAt)}
          icon={
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7v5l3 2"
              />
            </svg>
          }
        />
      </div>

      {/* Basic Information */}
      <section className="rounded-xl border border-[#e5edf4] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#263746]">
            Basic information
          </h2>
          <span className="text-xs text-[#8493a2]">
            Created {formatDate(itinerary.createdAt)}
          </span>
        </div>

        <div className="grid gap-3 border-t border-[#edf1f5] pt-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-[#8493a2]">Itinerary name</p>
            <p className="mt-1 text-sm font-medium text-[#263746]">
              {itinerary.title}
            </p>
          </div>

          <div>
            <p className="text-xs text-[#8493a2]">Status</p>
            <div className="mt-1">
              <StatusBadge status={itinerary.status} />
            </div>
          </div>
        </div>
      </section>

      {/* Day-wise Itinerary */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#263746]">
              Day-wise itinerary
            </h2>
            <p className="mt-0.5 text-xs text-[#8493a2]">
              Schedule and activities for each day
            </p>
          </div>

          <span className="rounded-full bg-[#eaf5fc] px-3 py-1 text-xs font-medium text-[#168dcc]">
            {days.length} {days.length === 1 ? 'Day' : 'Days'}
          </span>
        </div>

        {days.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#d3dfeb] bg-white px-5 py-9 text-center">
            <p className="text-sm font-medium text-[#263746]">
              No day plans available
            </p>
            <p className="mt-1 text-xs text-[#8493a2]">
              This itinerary does not have any activities yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {days
              .slice()
              .sort((a, b) => a.dayNumber - b.dayNumber)
              .map((day) => (
                <div
                  key={day.id ?? day.dayNumber}
                  className="overflow-hidden rounded-xl border border-[#e5edf4] bg-white shadow-sm"
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between gap-3 border-b border-[#edf1f5] bg-[#f8fafc] px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5fc] text-sm font-semibold text-[#168dcc]">
                        {String(day.dayNumber).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-wide text-[#8493a2]">
                          Day {day.dayNumber}
                        </p>
                        <h3 className="truncate text-sm font-semibold text-[#263746]">
                          {day.title}
                        </h3>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full border border-[#e5edf4] bg-white px-2.5 py-1 text-[11px] text-[#8493a2]">
                      {day.activities.length}{' '}
                      {day.activities.length === 1
                        ? 'Activity'
                        : 'Activities'}
                    </span>
                  </div>

                  {/* Activities */}
                  <div className="px-4 py-3">
                    {day.activities.length === 0 ? (
                      <p className="py-1 text-xs text-[#8493a2]">
                        No activities added for this day.
                      </p>
                    ) : (
                      <div className="relative space-y-3">
                        {day.activities
                          .slice()
                          .sort((a, b) => a.order - b.order)
                          .map((activity, index) => (
                            <div
                              key={
                                activity.id ??
                                `${day.dayNumber}-${activity.order}`
                              }
                              className="relative flex items-start gap-3"
                            >
                              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#dceaf4] bg-white text-[11px] font-medium text-[#168dcc]">
                                {index + 1}
                              </div>

                              <p className="min-w-0 pt-1 text-sm text-[#34495a]">
                                {activity.title}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
