
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ItineraryDayCard } from "./itinerary-day-card";
import { ItinerarySummary } from "./itinerary-summary";

import type {
  ItineraryDay,
  CreateItineraryPayload,
} from "../types/itinerary.types";

interface ItineraryFormProps {
  onSave: (payload: CreateItineraryPayload) => void;
  isSaving?: boolean;
}

function createId() {
  return crypto.randomUUID();
}

function createDay(dayNumber: number): ItineraryDay {
  return {
    id: createId(),
    dayNumber,
    title: "",
    activities: [],
  };
}

export function ItineraryForm({
  onSave,
  isSaving = false,
}: ItineraryFormProps) {
  const router = useRouter();

  // Empty itinerary title initially
  const [title, setTitle] = useState("");

  // No days or activities initially
  const [days, setDays] = useState<ItineraryDay[]>([]);

  const totalActivities = useMemo(
    () =>
      days.reduce(
        (total, day) => total + day.activities.length,
        0,
      ),
    [days],
  );

  const hasUnsavedChanges =
    title.trim().length > 0 || days.length > 0;

  function updateDayTitle(dayId: string, value: string) {
    setDays((previous) =>
      previous.map((day) =>
        day.id === dayId ? { ...day, title: value } : day,
      ),
    );
  }

  function updateActivity(
    dayId: string,
    activityId: string,
    value: string,
  ) {
    setDays((previous) =>
      previous.map((day) => {
        if (day.id !== dayId) return day;

        return {
          ...day,
          activities: day.activities.map((activity) =>
            activity.id === activityId
              ? { ...activity, title: value }
              : activity,
          ),
        };
      }),
    );
  }

  function addActivity(dayId: string) {
    setDays((previous) =>
      previous.map((day) => {
        if (day.id !== dayId) return day;

        return {
          ...day,
          activities: [
            ...day.activities,
            {
              id: createId(),
              title: "",
              order: day.activities.length + 1,
            },
          ],
        };
      }),
    );
  }

  function removeActivity(dayId: string, activityId: string) {
    setDays((previous) =>
      previous.map((day) => {
        if (day.id !== dayId) return day;

        const activities = day.activities
          .filter((activity) => activity.id !== activityId)
          .map((activity, index) => ({
            ...activity,
            order: index + 1,
          }));

        return { ...day, activities };
      }),
    );
  }

  function addDay() {
    setDays((previous) => [
      ...previous,
      createDay(previous.length + 1),
    ]);
  }

  function removeDay(dayId: string) {
    setDays((previous) =>
      previous
        .filter((day) => day.id !== dayId)
        .map((day, index) => ({
          ...day,
          dayNumber: index + 1,
        })),
    );
  }

  function createPayload(): CreateItineraryPayload {
    return {
      title: title.trim(),
      days: days.map((day, dayIndex) => ({
        id: day.id,
        dayNumber: dayIndex + 1,
        title: day.title.trim(),
        activities: day.activities
          .filter((activity) => activity.title.trim())
          .map((activity, activityIndex) => ({
            id: activity.id,
            title: activity.title.trim(),
            order: activityIndex + 1,
          })),
      })),
    };
  }

  function handleSave() {
    if (isSaving) return;

    if (!title.trim()) {
      alert("Please enter an itinerary title.");
      return;
    }

    if (days.length === 0) {
      alert("Please add at least one day.");
      return;
    }

    for (const [index, day] of days.entries()) {
      if (!day.title.trim()) {
        alert(`Please enter a title for Day ${index + 1}.`);
        return;
      }

      if (!day.activities.some((activity) => activity.title.trim())) {
        alert(`Please add at least one activity to Day ${index + 1}.`);
        return;
      }
    }

    onSave(createPayload());
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-[#718096]">
            <span
              className="cursor-pointer hover:text-[#0879bd]"
              onClick={() => router.push("/masters/itinerary")}
            >
              Masters
            </span>
            {" › Itinerary › Add"}
          </p>

          <h1 className="text-[30px] font-bold leading-tight text-[#10243a]">
            Add itinerary
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={isSaving}
            onClick={() => router.push("/masters/itinerary")}
            className="rounded-xl border border-[#d3dfeb] bg-white px-5 py-3 text-sm font-medium text-[#263746] hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="rounded-xl bg-[#ff851b] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#f4770b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save itinerary"}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_342px]">
        {/* Left column */}
        <div className="min-w-0 space-y-3">
          {/* Itinerary title */}
          <section className="rounded-[20px] bg-white p-4 shadow-sm sm:p-5">
            <label
              htmlFor="itinerary-title"
              className="mb-1 block text-sm text-[#718096]"
            >
              Itinerary title <span className="text-red-500">*</span>
            </label>

            <input
              id="itinerary-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter itinerary title"
              className="h-12 w-full rounded-xl border border-[#d3dfeb] bg-[#f8fafc] px-3.5 font-semibold text-[#172b42] outline-none transition focus:border-[#168dcc] focus:ring-2 focus:ring-blue-100"
            />
          </section>

          {/* Day cards */}
          <div className="space-y-3">
            {days.map((day) => (
              <ItineraryDayCard
                key={day.id}
                day={day}
                onTitleChange={updateDayTitle}
                onActivityChange={updateActivity}
                onAddActivity={addActivity}
                onRemoveActivity={removeActivity}
                onRemoveDay={removeDay}
              />
            ))}
          </div>

          {/* Empty state */}
          {days.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#d3dfeb] bg-white px-5 py-10 text-center">
              <p className="text-base font-semibold text-[#263746]">
                No days added yet
              </p>
              <p className="mt-1 text-sm text-[#718096]">
                Start building your itinerary by adding your first day.
              </p>
            </div>
          )}

          {/* Add day */}
          <button
            type="button"
            disabled={isSaving}
            onClick={addDay}
            className="w-full rounded-2xl border-2 border-dashed border-[#83bce3] bg-[#f5faff] px-4 py-5 text-base font-bold text-[#0879bd] transition hover:bg-[#eaf5ff] disabled:opacity-60"
          >
            + Add day
          </button>
        </div>

        {/* Right column */}
        <aside className="space-y-4 xl:sticky xl:top-5">
          <ItinerarySummary
            totalDays={days.length}
            totalActivities={totalActivities}
            hasUnsavedChanges={hasUnsavedChanges}
          />
        </aside>
      </div>
    </div>
  );
}
