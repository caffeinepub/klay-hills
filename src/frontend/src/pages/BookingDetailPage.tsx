import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Moon, Pencil, Sun, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TimeOfDay } from "../backend";
import { hallLabel } from "../components/BookingForm";
import { PendingBadge } from "../components/PendingBadge";
import { useBooking, useDeleteBooking } from "../lib/backend-client";
import { formatCurrency, formatDate } from "../lib/utils";

function DetailRow({
  label,
  value,
  isBalance = false,
}: { label: string; value: React.ReactNode; isBalance?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium ${isBalance ? "" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function BookingDetailPage() {
  const { id } = useParams({ from: "/app/bookings/$id" });
  const bookingId = BigInt(id);
  const { data: booking, isLoading } = useBooking(bookingId);
  const deleteMutation = useDeleteBooking();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(bookingId);
      toast.success("Booking deleted");
      navigate({ to: "/bookings" });
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl space-y-4">
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

  const balance = Number(booking.balanceReceivable);

  return (
    <div className="space-y-5 max-w-2xl" data-ocid="booking-detail-page">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/bookings" })}
            aria-label="Back to bookings"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold text-foreground truncate">
              {booking.customerName}
            </h1>
            <p className="text-muted-foreground text-sm">
              Booking #{booking.id.toString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button asChild variant="outline" size="sm">
            <Link to="/bookings/$id/edit" params={{ id }}>
              <Pencil className="h-4 w-4 mr-1.5" /> Edit
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={() => setShowDelete(true)}
            data-ocid="delete-booking-btn"
          >
            <Trash2 className="h-4 w-4 mr-1.5" /> Delete
          </Button>
        </div>
      </div>

      {/* Balance highlight if pending */}
      {balance > 0 && (
        <div
          className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 flex items-center justify-between"
          data-ocid="balance-receivable-highlight"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
              ⚠ Balance Receivable
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Payment outstanding from customer
            </p>
          </div>
          <p className="text-3xl font-bold font-mono text-destructive">
            {formatCurrency(balance)}
          </p>
        </div>
      )}

      {/* Main Detail Card */}
      <Card>
        <CardContent className="p-5 space-y-0">
          <DetailRow label="Customer Name" value={booking.customerName} />
          <DetailRow
            label="Booking Date"
            value={formatDate(booking.bookingDate)}
          />
          <DetailRow
            label="Function Date"
            value={formatDate(booking.functionDate)}
          />
          <DetailRow
            label="Time of Day"
            value={
              <Badge
                variant="outline"
                className={
                  booking.timeOfDay === TimeOfDay.day
                    ? "border-amber-500/50 text-amber-700"
                    : "border-indigo-500/50 text-indigo-700"
                }
              >
                {booking.timeOfDay === TimeOfDay.day ? (
                  <>
                    <Sun className="h-3 w-3 mr-1" />
                    Day
                  </>
                ) : (
                  <>
                    <Moon className="h-3 w-3 mr-1" />
                    Evening
                  </>
                )}
              </Badge>
            }
          />
          <DetailRow
            label="Hall"
            value={
              <Badge variant="secondary" className="text-xs">
                {hallLabel(booking.hall)}
              </Badge>
            }
          />
          <DetailRow
            label="Rent Amount"
            value={
              <span className="font-mono">
                {formatCurrency(booking.rentAmount)}
              </span>
            }
          />
          <DetailRow
            label="Advance Received"
            value={
              <span className="font-mono">
                {formatCurrency(booking.advanceReceived)}
              </span>
            }
          />
          <DetailRow
            label="Discount"
            value={
              <span className="font-mono">
                {formatCurrency(booking.discount)}
              </span>
            }
          />
          <DetailRow
            label="Settlement Amount"
            value={
              <span className="font-mono">
                {formatCurrency(booking.settlementAmount)}
              </span>
            }
          />
          <DetailRow
            label="Total Cash Receipt"
            value={
              <span className="font-mono">
                {formatCurrency(booking.totalCashReceipt)}
              </span>
            }
          />
          <DetailRow
            label="Total Bank Receipt"
            value={
              <span className="font-mono">
                {formatCurrency(booking.totalBankReceipt)}
              </span>
            }
          />
          <DetailRow
            label="Balance Receivable"
            isBalance
            value={<PendingBadge amount={booking.balanceReceivable} />}
          />
          {booking.remarks && (
            <DetailRow
              label="Remarks"
              value={
                <span className="text-right max-w-xs break-words">
                  {booking.remarks}
                </span>
              }
            />
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The booking for{" "}
              <strong>{booking.customerName}</strong> will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              data-ocid="confirm-delete-btn"
            >
              {deleteMutation.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
