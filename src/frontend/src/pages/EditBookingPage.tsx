import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { BookingForm } from "../components/BookingForm";
import { useBooking, useUpdateBooking } from "../lib/backend-client";
import type { BookingInput } from "../types";

export default function EditBookingPage() {
  const { id } = useParams({ from: "/app/bookings/$id/edit" });
  const bookingId = BigInt(id);
  const { data: booking, isLoading } = useBooking(bookingId);
  const updateMutation = useUpdateBooking();
  const navigate = useNavigate();

  const handleSubmit = async (input: BookingInput) => {
    try {
      await updateMutation.mutateAsync({ id: bookingId, input });
      toast.success("Booking updated successfully");
      navigate({ to: "/bookings/$id", params: { id } });
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const handleCancel = () => {
    navigate({ to: "/bookings/$id", params: { id } });
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Booking not found.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/bookings">Back to Bookings</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl" data-ocid="edit-booking-page">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/bookings/$id", params: { id } })}
          className="shrink-0"
          aria-label="Back to booking detail"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Edit Booking
          </h1>
          <p className="text-muted-foreground text-sm">
            {booking.customerName}
          </p>
        </div>
      </div>
      <BookingForm
        initialData={booking}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={updateMutation.isPending}
        submitLabel="Update Booking"
      />
    </div>
  );
}
