import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Building2 } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-muted mb-6">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-6xl font-bold text-foreground mb-2">
          404
        </h1>
        <h2 className="font-display text-xl font-semibold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
