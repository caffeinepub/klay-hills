import type { ReactNode } from "react";

// Auth has been removed. ProtectedRoute is now a passthrough.
export function ProtectedRoute({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
