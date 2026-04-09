import { Card, CardContent } from "@/components/ui/card";
import { Info, Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-5 max-w-lg" data-ocid="settings-page">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Application settings and information
        </p>
      </div>

      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-display font-semibold text-foreground">
              About
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">KLAY HILLS</span> is a
            Convention Centre Management system for managing bookings, fee
            calculations, and reports.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
