"use client";
import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { Menu } from "lucide-react";

export function DashboardShell({children}:{children:React.ReactNode}){
     const [mobileOpen,setMobileOpen]=useState(false);

     return (
        <div className="min-h-screen bg-[#eaf0f7">
            <AppSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="min-h-screen lg:pl-[268px]">
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-slate-200 bg-white/95 px-5 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <span className="ml-3 font-semibold text-[#10243a]">
            Glocal Holiday
          </span>
        </header>

        <main className="min-h-screen bg-blue-50 p-10">
          {children}
        </main>
      </div>

        </div>
     )
}