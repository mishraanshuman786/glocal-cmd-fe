import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  PhoneCall,
  FileText,
  CalendarCheck,
  Hotel,
  CreditCard,
  MessageSquare,
  Database,
  ShieldCheck,
  BarChart3,
  Settings,
 
  X,
} from "lucide-react";


interface NavItem{
    label:string;
    href:string;
    icon:React.ElementType;
}

interface NavGroup{
    label:string;
    items:NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "SALES",
    items: [
      { label: "Leads", href: "/leads", icon: Users },
      { label: "Pipeline", href: "/pipeline", icon: GitBranch },
      { label: "Follow-ups", href: "/follow-ups", icon: PhoneCall },
      { label: "Quotations", href: "/quotations", icon: FileText },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { label: "Bookings", href: "/bookings", icon: CalendarCheck },
      { label: "Hotels and Vehicles", href: "/hotels-vehicles", icon: Hotel },
      { label: "Payments", href: "/payments", icon: CreditCard },
      { label: "Post Trip Review", href: "/post-trip-review", icon: MessageSquare },
    ],
  },
  {
    label: "ADMIN",
    items: [
      { label: "Masters", href: "/masters/itinerary", icon: Database },
      { label: "Users and Access", href: "/users-access", icon: ShieldCheck },
      { label: "Reports", href: "/reports", icon: BarChart3 },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface AppSidebarProps{
    mobileOpen:boolean;
    onClose:()=>void;
}

export function AppSidebar({mobileOpen, onClose}:AppSidebarProps){
    const pathname=usePathname();

      const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`) ||
      (href === "/masters/itinerary" && pathname.startsWith("/masters/"));
  };

  return (
    <>
    {
        mobileOpen && (
            <button 
               aria-label="Close sidebar"
               onClick={onClose}
               className="flex inset-0 z-40 bg-black/50 lg:hidden"
            />
        )
    }

     <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col
          bg-[#0c2b49] text-white transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between px-7">
          <Link href="/" className="text-[23px] font-bold tracking-tight">
            Glocal Holiday
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden"
            aria-label="Close navigation"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6 pt-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-3 px-3 text-[12px] font-medium tracking-wider text-[#7894af]">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        group flex h-11 items-center gap-3 rounded-xl
                        px-3 text-[15px] transition-colors
                        ${
                          active
                            ? "border-l-[3px] border-[#ff851b] bg-[#315779] text-white"
                            : "text-[#b0c4d9] hover:bg-[#183e60] hover:text-white"
                        }
                      `}
                    >
                      <Icon size={19} strokeWidth={1.8} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )

}