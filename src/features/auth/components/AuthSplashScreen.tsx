'use client';

const stats = [
  { value: '793', label: 'Leads tracked' },
  { value: '3', label: 'Lead sources' },
  { value: 'Live', label: 'New lead alerts' },
];

export function AuthSplashScreen() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-linear-to-br from-[#0c2944] via-[#07558b] to-[#087db7] px-6 py-8 text-white sm:px-12 sm:py-10 lg:px-16">

      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-125 w-125 rounded-full border border-white/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-40 h-150 w-150 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
      />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
            Glocal Holiday
          </h1>
          <p className="mt-1 text-xs tracking-widest text-blue-100/70">
            HOLIDAY CRM PLATFORM
          </p>
        </div>

        <div className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-blue-50 backdrop-blur-md sm:block">
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          Secure environment
        </div>
      </header>

      {/* Main content */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">

        {/* Loading animation */}
        <div className="relative flex h-24 w-24 items-center justify-center">

          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/15 border-t-cyan-300" />

          <div className="absolute inset-3 rounded-full border border-white/10" />

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg shadow-black/10 backdrop-blur-md">
            <span className="text-xl font-bold text-white">G</span>
          </div>
        </div>

        <p className="mt-9 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
          Welcome to Glocal Holiday
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Every enquiry,
          <br />
          <span className="text-cyan-200">
            one clear pipeline.
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-blue-50/85 sm:text-base">
          Capture leads from Facebook, Google and your website,
          follow up on time, and turn quotes into bookings.
        </p>

        {/* Authentication status */}
        <div className="mt-12 flex flex-col items-center">
          <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />

            <span className="text-sm font-medium text-white">
              Checking authentication...
            </span>
          </div>

          <p className="mt-4 text-xs text-blue-100/60">
            Please wait while we securely prepare your workspace.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <footer className="relative z-10 mx-auto w-full max-w-3xl pb-4">
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/15 bg-white/10 px-3 py-5 text-center shadow-lg shadow-black/5 backdrop-blur-md sm:px-6 sm:py-6"
            >
              <p className="text-xl font-bold tracking-tight sm:text-3xl">
                {stat.value}
              </p>

              <p className="mt-2 text-[10px] font-medium text-blue-100/80 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-blue-100/60">
          © 2026 Glocal Holiday · Secure sign-in
        </p>
      </footer>
    </main>
  );
}
