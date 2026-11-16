
'use client';

import { useEffect, useRef, useState } from 'react';

export interface CustomSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  ariaLabel = 'Select an option',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  // Close dropdown when clicking outside.
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Close dropdown when pressing Escape.
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (option: CustomSelectOption) => {
    if (option.disabled) return;

    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      {/* Dropdown Trigger */}
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex h-11 w-full items-center justify-between
          rounded-full border border-[#d3dfeb]
          bg-white pl-4 pr-4 text-left text-sm
          text-[#263746] shadow-sm outline-none
          transition-all duration-200
          hover:border-[#168dcc]
          focus:border-[#168dcc]
          focus:ring-2 focus:ring-[#168dcc]/10
          disabled:cursor-not-allowed disabled:opacity-50
          ${isOpen ? 'border-[#168dcc] ring-2 ring-[#168dcc]/10' : ''}
        `}
      >
        <span className={selectedOption ? '' : 'text-[#8998a7]'}>
          {selectedOption?.label ?? placeholder}
        </span>

        <svg
          className={`h-4 w-4 shrink-0 text-[#263746] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className="
            absolute left-0 top-full z-50 mt-2 w-full
            overflow-hidden rounded-2xl
            border border-[#e1e8f0] bg-white
            p-1.5 shadow-lg shadow-slate-200/60
            animate-in fade-in slide-in-from-top-1
            duration-150
          "
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
                className={`
                  flex w-full items-center justify-between
                  rounded-xl px-3 py-2.5 text-left
                  text-sm transition-colors duration-150
                  disabled:cursor-not-allowed disabled:opacity-40
                  ${
                    isSelected
                      ? 'bg-[#eaf5fc] font-medium text-[#168dcc]'
                      : 'text-[#263746] hover:bg-[#f3f7fa]'
                  }
                `}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <svg
                    className="h-4 w-4 text-[#168dcc]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 12 4 4L19 6"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
