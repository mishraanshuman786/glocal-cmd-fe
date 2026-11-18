
"use client";

import { useEffect, useState } from "react";

import { CustomSelect } from "@/components/ui/custom-select";

import type {
  CreateStatePayload,
  StateRegion,
} from "../types/state.types";

interface CreateStateModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (payload: CreateStatePayload) => void;
}

const regionOptions = [
  { label: "North", value: "NORTH" },
  { label: "South", value: "SOUTH" },
  { label: "East", value: "EAST" },
  { label: "West", value: "WEST" },
  { label: "North East", value: "NORTH_EAST" },
];

export function CreateStateModal({
  isOpen,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: CreateStateModalProps) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState<StateRegion>("NORTH");

  // Reset form whenever the modal opens.
  useEffect(() => {
    if (isOpen) {
      setName("");
      setRegion("NORTH");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSubmit() {
    const trimmedName = name.trim();

    if (!trimmedName || isSubmitting) return;

    onSubmit({
      name: trimmedName,
      region,
    });
  }

  function handleClose() {
    if (isSubmitting) return;

    setName("");
    setRegion("NORTH");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-[#10243a]">
          Add state
        </h2>

        <p className="mt-1 text-sm text-[#718096]">
          Add a state or union territory to your master data.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="state-name"
              className="mb-2 block text-sm font-medium text-[#263746]"
            >
              State name
            </label>

            <input
              id="state-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              placeholder="Enter state name"
              className="h-11 w-full rounded-xl border border-[#d3dfeb] px-3 text-[#263746] outline-none placeholder:text-[#8b929b] focus:border-[#168dcc]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#263746]">
              Region
            </label>

            <CustomSelect
              options={regionOptions}
              value={region}
              onChange={(value) => setRegion(value as StateRegion)}
              ariaLabel="Select region"
              placeholder="Select region"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleClose}
            className="rounded-xl border border-[#d3dfeb] px-5 py-2.5 text-sm font-medium text-[#526273] hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!name.trim() || isSubmitting}
            onClick={handleSubmit}
            className="rounded-xl bg-[#ff851b] px-5 py-2.5 text-sm font-semibold text-[#111827] hover:bg-[#f4770b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save state"}
          </button>
        </div>
      </div>
    </div>
  );
}
