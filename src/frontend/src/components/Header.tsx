import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header
      className="flex h-16 items-center justify-between border-b border-border bg-card px-4 shadow-sm"
      data-ocid="app-header"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
          aria-label="Toggle sidebar"
          data-ocid="menu-toggle"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden lg:block">
          <h1 className="font-display font-bold text-foreground text-base">
            KLAY HILLS Convention Centre
          </h1>
        </div>
      </div>
    </header>
  );
}
