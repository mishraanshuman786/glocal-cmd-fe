
import type { ReactNode } from 'react';

import { ThemeToggle } from '@/components/theme-toggle';

interface LoginLayoutProps {
  children: ReactNode;
}

const stats = [
  { value: '793', label: 'Leads tracked' },
  { value: '3', label: 'Lead sources' },
  { value: 'Live', label: 'New lead alerts' },
];

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="grid min-h-screen grid-cols-1 bg-white dark:bg-[#111c30] lg:grid-cols-[54%_46%]">

      {/* Left branding panel */}
      <section className="relative flex min-h-105 flex-col justify-between overflow-hidden bg-linear-to-br from-[#0c2944] via-[#07558b] to-[#087db7] px-8 py-9 text-white sm:px-12 lg:min-h-screen lg:px-16 lg:py-16">

        {/* Decorative circle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-36 h-112.5 w-112.5 rounded-full bg-cyan-400/20"
        />

        {/* Brand */}
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
            Glocal Holiday
          </h1>
        </div>

        {/* Main message */}
        <div className="relative z-10 my-12 max-w-xl lg:my-0">
          <h2 className="max-w-lg text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
            Every enquiry,
            <br />
            one clear pipeline.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-blue-50 sm:text-lg">
            Capture leads from Facebook, Google and your website,
            follow up on time, and turn quotes into bookings.
          </p>
        </div>

        {/* Statistics */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="min-w-28 rounded-2xl border border-white/10 bg-white/15 px-4 py-4 backdrop-blur-sm sm:min-w-31.5 sm:px-5"
            >
              <p className="text-2xl font-bold tracking-tight sm:text-[26px]">
                {stat.value}
              </p>

              <p className="mt-1 text-xs font-medium text-blue-50 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Right login panel */}
      <section className="relative flex min-h-155 items-center justify-center bg-white px-6 py-12 dark:bg-[#111c30] sm:px-10 lg:min-h-screen lg:px-12 xl:px-16">

        {/* Theme toggle */}
        <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-108">
          {children}

          <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
            © 2026 Glocal Holiday · Secure sign-in
          </p>
        </div>
      </section>
    </main>
  );
}
