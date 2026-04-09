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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { type Hall, TimeOfDay } from "../backend";
import { HALL_OPTIONS, hallLabel } from "../components/BookingForm";
import { PendingBadge } from "../components/PendingBadge";
import { useAllBookings, useDeleteBooking } from "../lib/backend-client";
import { formatCurrency, formatDate } from "../lib/utils";
import type { Booking } from "../types";

const PAGE_SIZE = 20;

type TimeFilter = "all" | TimeOfDay;
type HallFilter = "all" | Hall;

export default function BookingsPage() {
  const { data: bookings = [], isLoading } = useAllBookings();
  const deleteMutation = useDeleteBooking();
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [hallFilter, setHallFilter] = useState<HallFilter>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [deleteCustomer, setDeleteCustomer] = useState("");

  const filtered = useMemo(() => {
    let list = bookings as Booking[];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) => b.customerName.toLowerCase().includes(q));
    }
    if (timeFilter !== "all") {
      list = list.filter((b) => b.timeOfDay === timeFilter);
    }
    if (hallFilter !== "all") {
      list = list.filter((b) => b.hall === hallFilter);
    }
    if (startDate) {
      const start = new Date(startDate).getTime() * 1_000_000;
      list = list.filter((b) => Number(b.functionDate) >= start);
    }
    if (endDate) {
      const end = (new Date(endDate).getTime() + 86_400_000) * 1_000_000;
      list = list.filter((b) => Number(b.functionDate) <= end);
    }
    return list;
  }, [bookings, search, timeFilter, hallFilter, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const onTimeFilter = (t: TimeFilter) => {
    setTimeFilter(t);
    setPage(1);
  };
  const onHallFilter = (h: HallFilter) => {
    setHallFilter(h);
    setPage(1);
  };
  const clearFilters = () => {
    setSearch("");
    setTimeFilter("all");
    setHallFilter("all");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success("Booking deleted");
    } catch {
      toast.error("Failed to delete booking");
    } finally {
      setDeleteId(null);
      setDeleteCustomer("");
    }
  };

  const hasFilters =
    search ||
    timeFilter !== "all" ||
    hallFilter !== "all" ||
    startDate ||
    endDate;

  return (
    <div className="space-y-5" data-ocid="bookings-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            Bookings
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isLoading
              ? "Loading…"
              : `${filtered.length} of ${bookings.length} bookings`}
          </p>
        </div>
        <Button asChild data-ocid="new-booking-btn">
          <Link to="/bookings/new">
            <Plus className="h-4 w-4 mr-1.5" /> New Booking
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search customer name…"
                value={search}
                onChange={onSearch}
                className="pl-9"
                data-ocid="booking-search"
              />
            </div>

            {/* Time toggle */}
            <div
              className="flex items-center border border-border rounded-md overflow-hidden shrink-0"
              data-ocid="time-filter-toggle"
            >
              {(["all", TimeOfDay.day, TimeOfDay.evening] as TimeFilter[]).map(
                (t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onTimeFilter(t)}
                    className={`px-3 py-2 text-sm font-medium flex items-center gap-1.5 transition-smooth border-r border-border last:border-r-0 ${
                      timeFilter === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:bg-muted"
                    }`}
                    data-ocid={`filter-time-${t}`}
                  >
                    {t === "all" ? (
                      "All"
                    ) : t === TimeOfDay.day ? (
                      <>
                        <Sun className="h-3.5 w-3.5" /> Day
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5" /> Evening
                      </>
                    )}
                  </button>
                ),
              )}
            </div>

            {/* Hall filter */}
            <select
              value={hallFilter}
              onChange={(e) => onHallFilter(e.target.value as HallFilter)}
              className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0"
              data-ocid="filter-hall"
            >
              <option value="all">All Halls</option>
              {HALL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date range */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Function date:
            </span>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              className="w-36"
              data-ocid="filter-start-date"
            />
            <span className="text-xs text-muted-foreground">to</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              className="w-36"
              data-ocid="filter-end-date"
            />
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                data-ocid="btn-clear-filters"
              >
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : paged.length === 0 ? (
            <div className="py-16 text-center" data-ocid="bookings-empty">
              <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground mb-1">
                No bookings found
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {hasFilters
                  ? "Try adjusting your filters"
                  : "Create your first booking to get started"}
              </p>
              {!hasFilters && (
                <Button asChild size="sm">
                  <Link to="/bookings/new">+ New Booking</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {[
                      { label: "Customer Name", align: "left" },
                      { label: "Booking Date", align: "left" },
                      { label: "Function Date", align: "left" },
                      { label: "Time", align: "left" },
                      { label: "Hall", align: "left" },
                      { label: "Rent (₹)", align: "right" },
                      { label: "Advance (₹)", align: "right" },
                      { label: "Discount (₹)", align: "right" },
                      { label: "Settlement (₹)", align: "right" },
                      { label: "Balance (₹)", align: "right" },
                      { label: "Remarks", align: "left" },
                      { label: "Actions", align: "center" },
                    ].map(({ label, align }) => (
                      <th
                        key={label}
                        className={`py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap text-${align}`}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paged.map((b) => (
                    <BookingTableRow
                      key={b.id.toString()}
                      booking={b}
                      onDelete={() => {
                        setDeleteId(b.id);
                        setDeleteCustomer(b.customerName);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {!isLoading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
                data-ocid="btn-prev-page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-3 text-sm font-medium">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
                data-ocid="btn-next-page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={() => {
          setDeleteId(null);
          setDeleteCustomer("");
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The booking for{" "}
              <strong>{deleteCustomer}</strong> will be permanently removed.
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

function BookingTableRow({
  booking,
  onDelete,
}: {
  booking: Booking;
  onDelete: () => void;
}) {
  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors"
      data-ocid="booking-row"
    >
      <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap">
        {booking.customerName}
      </td>
      <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
        {formatDate(booking.bookingDate)}
      </td>
      <td className="py-2.5 px-3 text-muted-foreground whitespace-nowrap">
        {formatDate(booking.functionDate)}
      </td>
      <td className="py-2.5 px-3">
        <Badge
          variant="outline"
          className={`text-xs ${booking.timeOfDay === TimeOfDay.day ? "border-amber-500/50 text-amber-700" : "border-indigo-500/50 text-indigo-700"}`}
        >
          {booking.timeOfDay === TimeOfDay.day ? (
            <Sun className="h-3 w-3 mr-1" />
          ) : (
            <Moon className="h-3 w-3 mr-1" />
          )}
          {booking.timeOfDay === TimeOfDay.day ? "Day" : "Evening"}
        </Badge>
      </td>
      <td className="py-2.5 px-3">
        <Badge variant="secondary" className="text-xs whitespace-nowrap">
          {hallLabel(booking.hall)}
        </Badge>
      </td>
      <td className="py-2.5 px-3 text-right font-mono">
        {formatCurrency(booking.rentAmount)}
      </td>
      <td className="py-2.5 px-3 text-right font-mono">
        {formatCurrency(booking.advanceReceived)}
      </td>
      <td className="py-2.5 px-3 text-right font-mono">
        {formatCurrency(booking.discount)}
      </td>
      <td className="py-2.5 px-3 text-right font-mono">
        {formatCurrency(booking.settlementAmount)}
      </td>
      <td className="py-2.5 px-3 text-right">
        <PendingBadge amount={booking.balanceReceivable} />
      </td>
      <td className="py-2.5 px-3 text-muted-foreground max-w-[140px] truncate">
        {booking.remarks || "—"}
      </td>
      <td className="py-2.5 px-3">
        <div className="flex items-center justify-center gap-1">
          <Button asChild variant="ghost" size="icon" className="h-7 w-7">
            <Link to="/bookings/$id" params={{ id: booking.id.toString() }}>
              <Eye className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="h-7 w-7">
            <Link
              to="/bookings/$id/edit"
              params={{ id: booking.id.toString() }}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:bg-destructive/10"
            onClick={onDelete}
            aria-label="Delete booking"
            data-ocid="delete-booking-btn"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
