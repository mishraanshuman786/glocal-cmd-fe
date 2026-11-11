"use client";

import type { ItineraryDay, ItineraryActivity } from "../types/itinerary.types";
interface ItineraryDayCardProps{
    day:ItineraryDay;
    onTitleChange:(dayId:string,title:string)=>void;
    onActivityChange:(dayId:string,activityId:string,title:string)=>void;
    onAddActivity:(dayId:string)=>void;
    onRemoveActivity:(dayId:string,activityId:string)=>void;
    onRemoveDay:(dayId:string)=>void;
}

export function ItineraryDayCard({
    day,onTitleChange,onActivityChange,onAddActivity,onRemoveActivity,onRemoveDay
}:ItineraryDayCardProps){
   return ( <section className="flex overflow-hidden rounded-2xl border border-[#0d9e4ef] bg-white shadow-sm">
        {/* Day Label */}
        <div className="flex w-12 shrink-0 items-center justify-center bg-gradient-to-b from-[#168dcc] to-[#0874b5] sm:w-12">
            <span className="text-sm font-bold tracking-wide text-white"
              style={{writingMode:"vertical-rl", transform:"rotate(180deg)"}}
            >
                 DAY {day.dayNumber}    
            </span>

        </div>

        {/* Day Content */}
        <div className="min-w-0 flex-1 space-y-2 p-3 sm:p-3.5">
            {/* Day Title */}
            <div className="flex items-center gap-2">
                <input 
                    value={day.title}
                    onChange={(event)=>onTitleChange(day.id,event.target.value)}
                    placeholder={`Day ${day.dayNumber} title`}
                    aria-label={`Day ${day.dayNumber} title`}
                    className="h-12 min-w-0 flex-1 rounded-xl border border-[#d3dfeb] bg-[#f8fafc] px-3.5 text-base font-semibold text-[#172b42] outline-none transition focus:border-[#168dcc] focus:ring-2 focus:ring-blue-100"

                />

                <button
            type="button"
            onClick={() => onRemoveDay(day.id)}
            title="Remove day"
            aria-label={`Remove day ${day.dayNumber}`}
            className="shrink-0 px-1 text-sm text-slate-400 hover:text-red-500"
          >
            ♜
          </button>

            </div>

            {/* Activities */}
        <div className="space-y-2">
          {day.activities.map((activity: ItineraryActivity) => (
            <div
              key={activity.id}
              className="flex min-w-0 items-center gap-2"
            >
              <span
                className="hidden cursor-grab text-lg leading-none text-[#91a6bd] sm:inline"
                title="Activity order"
              >
                ⠿
              </span>

              <input
                value={activity.title}
                onChange={(event) =>
                  onActivityChange(
                    day.id,
                    activity.id,
                    event.target.value,
                  )
                }
                placeholder="Enter activity"
                aria-label={`Activity ${activity.order} for day ${day.dayNumber}`}
                className="h-12 min-w-0 flex-1 rounded-xl border border-[#d3dfeb] bg-[#f8fafc] px-3.5 text-sm text-[#26394f] outline-none transition placeholder:text-slate-400 focus:border-[#168dcc] focus:ring-2 focus:ring-blue-100 sm:text-base"
              />

              <button
                type="button"
                onClick={() => onRemoveActivity(day.id, activity.id)}
                aria-label="Remove activity"
                title="Remove activity"
                className="shrink-0 px-1 text-lg text-slate-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>

   <button
          type="button"
          onClick={() => onAddActivity(day.id)}
          className="rounded-xl border border-[#d3dfeb] px-4 py-2 text-sm font-medium text-[#26394f] transition hover:border-[#168dcc] hover:bg-blue-50"
        >
          + Add activity
        </button>

        </div>

    </section>);

}