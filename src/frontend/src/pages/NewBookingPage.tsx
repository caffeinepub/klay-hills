import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { BookingForm } from "../components/BookingForm";
import { useCreateBooking } from "../lib/backend-client";
import type { BookingInput } from "../types";

export default function NewBookingPage() {
  const navigate = useNavigate();
  const createMutation = useCreateBooking();

  const handleSubmit = async (input: BookingInput) => {
    try {
      await createMutation.mutateAsync(input);
      toast.success("Booking created successfully");
      navigate({ to: "/bookings" });
    } catch {
      toast.error("Failed to create booking");
    }
  };

  const handleCancel = () => {
    navigate({ to: "/bookings" });
  };

  return (
    <div className="space-y-5 max-w-3xl" data-ocid="new-booking-page">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/bookings" })}
          className="shrink-0"
          aria-label="Back to bookings"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            New Booking
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a new convention centre booking
          </p>
        </div>
      </div>
      <BookingForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createMutation.isPending}
        submitLabel="Create Booking"
      />
    </div>
  );
}
