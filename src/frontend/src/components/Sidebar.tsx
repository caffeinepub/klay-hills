import { Link, useRouterState } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart3,
  Building2,
  CalendarDays,
  FileUp,
  LayoutDashboard,
  Settings,
  X,
} from "lucide-react";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Bookings", path: "/bookings", icon: CalendarDays },
  { label: "Pending Report", path: "/pending-report", icon: AlertCircle },
  { label: "Monthly Summary", path: "/monthly-summary", icon: BarChart3 },
  { label: "Import / Export", path: "/import-export", icon: FileUp },
  { label: "Settings", path: "/settings", icon: Settings },
] as const;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-card border-r border-border transition-transform duration-300",
          "lg:relative lg:translate-x-0 lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        data-ocid="sidebar-nav"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border bg-primary">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary-foreground" />
            <div>
              <div className="font-display font-bold text-primary-foreground text-sm leading-tight">
                KLAY HILLS
              </div>
              <div className="text-primary-foreground/70 text-xs leading-tight">
                Convention Centre
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const isActive =
              path === "/" ? currentPath === "/" : currentPath.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground hover:bg-muted hover:text-foreground",
                )}
                data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" size={18} />
                <span>{label}</span>
                {label === "Pending Report" && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-destructive animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border">
          <p className="text-muted-foreground text-xs text-center">
            © {new Date().getFullYear()} KLAY HILLS
          </p>
        </div>
      </aside>
    </>
  );
}
