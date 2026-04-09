import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CalendarRange,
  ClipboardList,
  Download,
  IndianRupee,
  Moon,
  Printer,
  Search,
  Sun,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { type Hall, TimeOfDay } from "../backend";
import { HALL_OPTIONS, hallLabel } from "../components/BookingForm";
import { PendingBadge } from "../components/PendingBadge";
import { usePendingBookings } from "../lib/backend-client";
import { formatCurrency, formatDate, timestampToDate } from "../lib/utils";
import type { Booking } from "../types";

// ─── Filter State ─────────────────────────────────────────────────────────────

interface Filters {
  customerName: string;
  bookingDateFrom: string;
  bookingDateTo: string;
  functionDateFrom: string;
  functionDateTo: string;
  timeOfDay: "all" | "day" | "evening";
  hall: "all" | Hall;
}

const defaultFilters: Filters = {
  customerName: "",
  bookingDateFrom: "",
  bookingDateTo: "",
  functionDateFrom: "",
  functionDateTo: "",
  timeOfDay: "all",
  hall: "all",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function inDateRange(ts: bigint, fromStr: string, toStr: string): boolean {
  if (!fromStr && !toStr) return true;
  const d = timestampToDate(ts);
  if (fromStr) {
    const from = new Date(fromStr);
    from.setHours(0, 0, 0, 0);
    if (d < from) return false;
  }
  if (toStr) {
    const to = new Date(toStr);
    to.setHours(23, 59, 59, 999);
    if (d > to) return false;
  }
  return true;
}

function applyFilters(bookings: Booking[], f: Filters): Booking[] {
  const nameLower = f.customerName.trim().toLowerCase();
  return bookings.filter((b) => {
    if (nameLower && !b.customerName.toLowerCase().includes(nameLower))
      return false;
    if (!inDateRange(b.bookingDate, f.bookingDateFrom, f.bookingDateTo))
      return false;
    if (!inDateRange(b.functionDate, f.functionDateFrom, f.functionDateTo))
      return false;
    if (f.timeOfDay !== "all") {
      const tod = b.timeOfDay === TimeOfDay.day ? "day" : "evening";
      if (tod !== f.timeOfDay) return false;
    }
    if (f.hall !== "all" && b.hall !== f.hall) return false;
    return true;
  });
}

// ─── Excel Export ─────────────────────────────────────────────────────────────

function exportToExcel(bookings: Booking[]) {
  const today = new Date().toLocaleDateString("en-IN");
  const totalPending = bookings.reduce(
    (s, b) => s + Number(b.balanceReceivable),
    0,
  );

  const rows = bookings.map((b, idx) => ({
    "#": idx + 1,
    "Customer Name": b.customerName,
    "Booking Date": formatDate(b.bookingDate),
    "Function Date": formatDate(b.functionDate),
    Time: b.timeOfDay === TimeOfDay.day ? "Day" : "Evening",
    Hall: hallLabel(b.hall),
    "Rent Amount (₹)": Number(b.rentAmount),
    "Advance Received (₹)": Number(b.advanceReceived),
    "Discount (₹)": Number(b.discount),
    "Settlement Amount (₹)": Number(b.settlementAmount),
    "Balance Receivable (₹)": Number(b.balanceReceivable),
    "Total Cash Receipt (₹)": Number(b.totalCashReceipt),
    "Total Bank Receipt (₹)": Number(b.totalBankReceipt),
    Remarks: b.remarks,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws["!cols"] = [
    { wch: 4 },
    { wch: 24 },
    { wch: 14 },
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
    { wch: 18 },
    { wch: 20 },
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
    { wch: 18 },
    { wch: 18 },
    { wch: 28 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Pending Fees");

  // Summary sheet
  const summaryData = [
    ["KLAY HILLS Convention Centre"],
    ["Pending Fee Report"],
    [`Generated: ${today}`],
    [""],
    ["Total Pending Bookings", bookings.length],
    ["Total Balance Receivable (INR)", totalPending],
    [
      "Day Bookings",
      bookings.filter((b) => b.timeOfDay === TimeOfDay.day).length,
    ],
    [
      "Evening Bookings",
      bookings.filter((b) => b.timeOfDay === TimeOfDay.evening).length,
    ],
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary["!cols"] = [{ wch: 36 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");

  const fileName = `KlayHills_PendingFees_${today.replace(/\//g, "-")}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

// ─── Summary Cards ─────────────────────────────────────────────────────────

function SummaryCards({ bookings }: { bookings: Booking[] }) {
  const totalPending = bookings.reduce(
    (s, b) => s + Number(b.balanceReceivable),
    0,
  );
  const avgPending =
    bookings.length > 0 ? Math.round(totalPending / bookings.length) : 0;
  const uniqueClients = new Set(bookings.map((b) => b.customerName)).size;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <IndianRupee className="h-3 w-3" />
            Total Pending
          </p>
          <p className="text-xl font-bold font-mono text-destructive leading-tight">
            {formatCurrency(totalPending)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <ClipboardList className="h-3 w-3" />
            Pending Bookings
          </p>
          <p className="text-xl font-bold font-mono text-foreground leading-tight">
            {bookings.length}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <IndianRupee className="h-3 w-3" />
            Avg. Balance
          </p>
          <p className="text-xl font-bold font-mono text-foreground leading-tight">
            {formatCurrency(avgPending)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
            <Users className="h-3 w-3" />
            Unique Clients
          </p>
          <p className="text-xl font-bold font-mono text-foreground leading-tight">
            {uniqueClients}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

interface FilterBarProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
  onExport: () => void;
  resultCount: number;
}

function FilterBar({
  filters,
  onChange,
  onReset,
  onExport,
  resultCount,
}: FilterBarProps) {
  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-5 space-y-3">
      {/* Row 1: search + time toggle + hall filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search customer name…"
            value={filters.customerName}
            onChange={(e) => set("customerName", e.target.value)}
            className="pl-8"
            data-ocid="filter-customer-name"
          />
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-md p-1 h-10">
          {(
            [
              { value: "all", label: "All" },
              { value: "day", label: "Day", icon: <Sun className="h-3 w-3" /> },
              {
                value: "evening",
                label: "Evening",
                icon: <Moon className="h-3 w-3" />,
              },
            ] as const
          ).map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("timeOfDay", opt.value)}
              className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-smooth ${
                filters.timeOfDay === opt.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`filter-time-${opt.value}`}
            >
              {"icon" in opt && opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
        <select
          value={filters.hall}
          onChange={(e) => set("hall", e.target.value as "all" | Hall)}
          className="h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

      {/* Row 2: date ranges + actions */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex items-end gap-2 flex-wrap">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <CalendarRange className="h-3 w-3" /> Booking Date From
            </Label>
            <Input
              type="date"
              value={filters.bookingDateFrom}
              onChange={(e) => set("bookingDateFrom", e.target.value)}
              className="w-36 text-sm"
              data-ocid="filter-booking-date-from"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1">To</Label>
            <Input
              type="date"
              value={filters.bookingDateTo}
              onChange={(e) => set("bookingDateTo", e.target.value)}
              className="w-36 text-sm"
              data-ocid="filter-booking-date-to"
            />
          </div>
        </div>

        <div className="flex items-end gap-2 flex-wrap">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <CalendarRange className="h-3 w-3" /> Function Date From
            </Label>
            <Input
              type="date"
              value={filters.functionDateFrom}
              onChange={(e) => set("functionDateFrom", e.target.value)}
              className="w-36 text-sm"
              data-ocid="filter-fn-date-from"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1">To</Label>
            <Input
              type="date"
              value={filters.functionDateTo}
              onChange={(e) => set("functionDateTo", e.target.value)}
              className="w-36 text-sm"
              data-ocid="filter-fn-date-to"
            />
          </div>
        </div>

        <div className="flex gap-2 ml-auto items-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            data-ocid="filter-reset"
          >
            Reset
          </Button>
          <Button
            size="sm"
            onClick={onExport}
            disabled={resultCount === 0}
            className="gap-1.5"
            data-ocid="export-excel-btn"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Report Table ─────────────────────────────────────────────────────────────

function PendingTable({ bookings }: { bookings: Booking[] }) {
  const totalPending = bookings.reduce(
    (s, b) => s + Number(b.balanceReceivable),
    0,
  );

  if (bookings.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="pending-empty"
      >
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-lg font-medium text-foreground">
          No pending fees found
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          No bookings match your filters, or all dues are settled.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm min-w-[1040px]">
        <thead>
          <tr className="bg-muted/60 border-b border-border">
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide w-8">
              #
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Customer Name
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
              Booking Date
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
              Function Date
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Time
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Hall
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap">
              Rent
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Advance
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Discount
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Settlement
            </th>
            <th className="text-right px-3 py-2.5 font-semibold text-destructive text-xs uppercase tracking-wide whitespace-nowrap">
              Balance Due
            </th>
            <th className="text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, idx) => (
            <tr
              key={b.id.toString()}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              data-ocid="pending-row"
            >
              <td className="px-3 py-2.5 text-muted-foreground font-mono text-xs">
                {idx + 1}
              </td>
              <td className="px-3 py-2.5 font-medium text-foreground max-w-[180px]">
                <Link
                  to="/bookings/$id"
                  params={{ id: b.id.toString() }}
                  className="hover:text-primary hover:underline truncate block"
                >
                  {b.customerName}
                </Link>
              </td>
              <td className="px-3 py-2.5 text-foreground font-mono text-xs whitespace-nowrap">
                {formatDate(b.bookingDate)}
              </td>
              <td className="px-3 py-2.5 text-foreground font-mono text-xs whitespace-nowrap">
                {formatDate(b.functionDate)}
              </td>
              <td className="px-3 py-2.5">
                <Badge
                  variant="outline"
                  className={`text-xs gap-1 ${
                    b.timeOfDay === TimeOfDay.day
                      ? "border-amber-400/60 text-amber-700 dark:text-amber-400"
                      : "border-indigo-400/60 text-indigo-700 dark:text-indigo-400"
                  }`}
                >
                  {b.timeOfDay === TimeOfDay.day ? (
                    <Sun className="h-3 w-3" />
                  ) : (
                    <Moon className="h-3 w-3" />
                  )}
                  {b.timeOfDay === TimeOfDay.day ? "Day" : "Evening"}
                </Badge>
              </td>
              <td className="px-3 py-2.5">
                <Badge
                  variant="secondary"
                  className="text-xs whitespace-nowrap"
                >
                  {hallLabel(b.hall)}
                </Badge>
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap">
                {formatCurrency(Number(b.rentAmount))}
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap">
                {formatCurrency(Number(b.advanceReceived))}
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap">
                {formatCurrency(Number(b.discount))}
              </td>
              <td className="px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap">
                {formatCurrency(Number(b.settlementAmount))}
              </td>
              <td className="px-3 py-2.5 text-right whitespace-nowrap">
                <PendingBadge amount={Number(b.balanceReceivable)} />
              </td>
              <td className="px-3 py-2.5 text-muted-foreground text-xs max-w-[140px] truncate">
                {b.remarks || "—"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-destructive/5 border-t-2 border-destructive/30 font-semibold">
            <td colSpan={10} className="px-3 py-3 text-sm text-foreground">
              Total — {bookings.length} booking
              {bookings.length !== 1 ? "s" : ""}
            </td>
            <td className="px-3 py-3 text-right">
              <span className="balance-highlight font-mono text-base">
                {formatCurrency(totalPending)}
              </span>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Loading State ─────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="space-y-4" data-ocid="loading-state">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["sk1", "sk2", "sk3", "sk4"] as const).map((sk) => (
          <Skeleton key={sk} className="h-20 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-28 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PendingReportPage() {
  const { data: allPending = [], isLoading } = usePendingBookings();
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filtered = useMemo(
    () => applyFilters(allPending, filters),
    [allPending, filters],
  );

  const generatedDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="max-w-screen-xl mx-auto px-4 py-6 print:px-2 print:py-2"
      data-ocid="pending-report-page"
    >
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
            Pending Fee Report
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            KLAY HILLS Convention Centre &nbsp;·&nbsp; Generated:{" "}
            {generatedDate}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          className="gap-1.5 print:hidden shrink-0"
          data-ocid="print-btn"
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <SummaryCards bookings={filtered} />

          <div className="print:hidden">
            <FilterBar
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
              onExport={() => exportToExcel(filtered)}
              resultCount={filtered.length}
            />
          </div>

          {/* Print-only filter summary */}
          <div className="hidden print:block text-xs text-muted-foreground mb-3">
            Customer: {filters.customerName || "All"} &nbsp;|&nbsp; Time:{" "}
            {filters.timeOfDay} &nbsp;|&nbsp; Hall:{" "}
            {filters.hall === "all" ? "All" : hallLabel(filters.hall as Hall)}{" "}
            &nbsp;|&nbsp; Showing {filtered.length} booking
            {filtered.length !== 1 ? "s" : ""}
          </div>

          <PendingTable bookings={filtered} />
        </>
      )}
    </div>
  );
}
