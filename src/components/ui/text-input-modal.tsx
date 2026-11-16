"use client";

import { useEffect, useState } from "react";

interface TextInputModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  inputLabel: string;
  placeholder?: string;
  initialValue?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: (value: string) => void | Promise<void>;
  onClose: () => void;
}

export function TextInputModal({
  isOpen,
  title,
  description,
  inputLabel,
  placeholder = "Enter a value",
  initialValue = "",
  confirmText = "OK",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onClose,
}: TextInputModalProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  const trimmedValue = value.trim();
  const isValid = trimmedValue.length > 0;

  async function handleConfirm() {
    if (!trimmedValue || isLoading) return;

    await onConfirm(trimmedValue);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="text-input-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="text-input-modal-title"
          className="text-lg font-bold text-[#10243a]"
        >
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm leading-6 text-[#718096]">{description}</p>
        )}

        <div className="mt-5">
          <label
            htmlFor="text-input-modal-value"
            className="mb-2 block text-sm font-semibold text-[#263746]"
          >
            {inputLabel}
          </label>

          <input
            id="text-input-modal-value"
            type="text"
            autoFocus
            maxLength={200}
            value={value}
            disabled={isLoading}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && isValid && !isLoading) {
                void handleConfirm();
              }

              if (event.key === "Escape" && !isLoading) {
                onClose();
              }
            }}
            placeholder={placeholder}
            className="h-11 w-full rounded-xl border border-[#d3dfeb] px-4 text-sm text-[#263746] outline-none transition placeholder:text-[#a0aec0] focus:border-[#168dcc] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
          />

          {!isValid && value.length > 0 && (
            <p className="mt-1.5 text-xs text-red-500">
              Please enter a valid value.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-[#d3dfeb] bg-white px-5 py-3 text-sm font-medium text-[#263746] hover:bg-slate-50 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => void handleConfirm()}
            disabled={!isValid || isLoading}
            className="rounded-xl bg-[#ff851b] px-5 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#f4770b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
