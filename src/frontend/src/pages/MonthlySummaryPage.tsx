import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calendar,
  Download,
  Minus,
} from "lucide-react";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useAllBookings, useMonthlySummary } from "../lib/backend-client";
import { formatCurrency } from "../lib/utils";
import type { Booking, MonthlySummary } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = [
  currentYear,
  currentYear - 1,
  currentYear - 2,
  currentYear - 3,
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcYtd(bookings: Booking[], year: number, upToMonth: number) {
  const filtered = bookings.filter((b) => {
    const d = new Date(Number(b.functionDate) / 1_000_000);
    return d.getFullYear() === year && d.getMonth() + 1 <= upToMonth;
  });
  return {
    totalBookings: filtered.length,
    totalRentAmount: filtered.reduce((s, b) => s + Number(b.rentAmount), 0),
    totalAdvanceReceived: filtered.reduce(
      (s, b) => s + Number(b.advanceReceived),
      0,
    ),
    totalDiscount: filtered.reduce((s, b) => s + Number(b.discount), 0),
    totalSettlementAmount: filtered.reduce(
      (s, b) => s + Number(b.settlementAmount),
      0,
    ),
    totalCashReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalCashReceipt),
      0,
    ),
    totalBankReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalBankReceipt),
      0,
    ),
    totalPendingAmount: filtered.reduce(
      (s, b) => s + Number(b.balanceReceivable),
      0,
    ),
  };
}

function calcMonthTotals(bookings: Booking[], year: number, month: number) {
  const filtered = bookings.filter((b) => {
    const d = new Date(Number(b.functionDate) / 1_000_000);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
  return {
    totalBookings: filtered.length,
    totalRentAmount: filtered.reduce((s, b) => s + Number(b.rentAmount), 0),
    totalAdvanceReceived: filtered.reduce(
      (s, b) => s + Number(b.advanceReceived),
      0,
    ),
    totalDiscount: filtered.reduce((s, b) => s + Number(b.discount), 0),
    totalSettlementAmount: filtered.reduce(
      (s, b) => s + Number(b.settlementAmount),
      0,
    ),
    totalCashReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalCashReceipt),
      0,
    ),
    totalBankReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalBankReceipt),
      0,
    ),
    totalPendingAmount: filtered.reduce(
      (s, b) => s + Number(b.balanceReceivable),
      0,
    ),
  };
}

type NumericSummaryKey =
  | "totalRentAmount"
  | "totalAdvanceReceived"
  | "totalDiscount"
  | "totalSettlementAmount"
  | "totalCashReceipt"
  | "totalBankReceipt"
  | "totalPendingAmount";

// ─── Sub-components ───────────────────────────────────────────────────────────

function DeltaBadge({ current, prev }: { current: number; prev: number }) {
  if (prev === 0 && current === 0)
    return <span className="text-muted-foreground text-xs">—</span>;
  const delta = current - prev;
  if (delta === 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
        <Minus className="h-3 w-3" /> 0%
      </span>
    );
  const pct = prev === 0 ? 100 : Math.abs(Math.round((delta / prev) * 100));
  const isUp = delta > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}
    >
      {isUp ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )}
      {pct}%
    </span>
  );
}

function SummaryTableRow({
  label,
  value,
  prev,
  highlight = false,
  isCurrency = true,
}: {
  label: string;
  value: number;
  prev?: number;
  highlight?: boolean;
  isCurrency?: boolean;
}) {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
      <td className="py-3 pl-4 text-sm text-muted-foreground">{label}</td>
      <td
        className={`py-3 pr-4 text-right font-mono text-sm font-semibold ${highlight && value > 0 ? "text-destructive" : "text-foreground"}`}
      >
        {isCurrency ? formatCurrency(value) : String(value)}
      </td>
      {prev !== undefined && (
        <td className="py-3 pr-4 text-right">
          <DeltaBadge current={value} prev={prev} />
        </td>
      )}
    </tr>
  );
}

const SKELETON_ROW_IDS = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];

function SkeletonRows({ count }: { count: number }) {
  return (
    <>
      {SKELETON_ROW_IDS.slice(0, count).map((id) => (
        <tr key={id}>
          <td className="py-2.5 pl-4">
            <Skeleton className="h-4 w-40" />
          </td>
          <td className="py-2.5 pr-4">
            <Skeleton className="h-4 w-24 ml-auto" />
          </td>
          <td className="py-2.5 pr-4">
            <Skeleton className="h-4 w-12 ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}

// ─── Excel Export ─────────────────────────────────────────────────────────────

function exportToExcel(
  summary: MonthlySummary | undefined,
  prevSummary: ReturnType<typeof calcMonthTotals> | undefined,
  monthName: string,
  year: number,
) {
  const current = summary
    ? {
        totalBookings: Number(summary.totalBookings),
        totalRentAmount: Number(summary.totalRentAmount),
        totalAdvanceReceived: Number(summary.totalAdvanceReceived),
        totalDiscount: Number(summary.totalDiscount),
        totalSettlementAmount: Number(summary.totalSettlementAmount),
        totalCashReceipt: Number(summary.totalCashReceipt),
        totalBankReceipt: Number(summary.totalBankReceipt),
        totalPendingAmount: Number(summary.totalPendingAmount),
      }
    : null;

  const rows = [
    ["KLAY HILLS – Monthly Summary Report"],
    [`Period: ${monthName} ${year}`],
    [`Generated: ${new Date().toLocaleString("en-IN")}`],
    [],
    ["Metric", `${monthName} ${year}`, "Previous Month", "Change"],
    [
      "Total Bookings",
      current?.totalBookings ?? 0,
      prevSummary?.totalBookings ?? 0,
      (current?.totalBookings ?? 0) - (prevSummary?.totalBookings ?? 0),
    ],
    [
      "Total Rent Amount (₹)",
      current?.totalRentAmount ?? 0,
      prevSummary?.totalRentAmount ?? 0,
      (current?.totalRentAmount ?? 0) - (prevSummary?.totalRentAmount ?? 0),
    ],
    [
      "Total Advance Received (₹)",
      current?.totalAdvanceReceived ?? 0,
      prevSummary?.totalAdvanceReceived ?? 0,
      (current?.totalAdvanceReceived ?? 0) -
        (prevSummary?.totalAdvanceReceived ?? 0),
    ],
    [
      "Total Discount (₹)",
      current?.totalDiscount ?? 0,
      prevSummary?.totalDiscount ?? 0,
      (current?.totalDiscount ?? 0) - (prevSummary?.totalDiscount ?? 0),
    ],
    [
      "Total Settlement Amount (₹)",
      current?.totalSettlementAmount ?? 0,
      prevSummary?.totalSettlementAmount ?? 0,
      (current?.totalSettlementAmount ?? 0) -
        (prevSummary?.totalSettlementAmount ?? 0),
    ],
    [
      "Total Cash Receipt (₹)",
      current?.totalCashReceipt ?? 0,
      prevSummary?.totalCashReceipt ?? 0,
      (current?.totalCashReceipt ?? 0) - (prevSummary?.totalCashReceipt ?? 0),
    ],
    [
      "Total Bank Receipt (₹)",
      current?.totalBankReceipt ?? 0,
      prevSummary?.totalBankReceipt ?? 0,
      (current?.totalBankReceipt ?? 0) - (prevSummary?.totalBankReceipt ?? 0),
    ],
    [
      "Total Pending Amount (₹)",
      current?.totalPendingAmount ?? 0,
      prevSummary?.totalPendingAmount ?? 0,
      (current?.totalPendingAmount ?? 0) -
        (prevSummary?.totalPendingAmount ?? 0),
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!cols"] = [{ wch: 32 }, { wch: 20 }, { wch: 20 }, { wch: 16 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Monthly Summary");
  XLSX.writeFile(wb, `KlayHills_${monthName}_${year}_Summary.xlsx`);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MonthlySummaryPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;

  const { data: summary, isLoading } = useMonthlySummary(year, month);
  const { data: prevSummaryData, isLoading: isPrevLoading } = useMonthlySummary(
    prevYear,
    prevMonth,
  );
  const { data: allBookings = [], isLoading: isBookingsLoading } =
    useAllBookings();

  const prevCalc = useMemo(
    () =>
      prevSummaryData
        ? {
            totalBookings: Number(prevSummaryData.totalBookings),
            totalRentAmount: Number(prevSummaryData.totalRentAmount),
            totalAdvanceReceived: Number(prevSummaryData.totalAdvanceReceived),
            totalDiscount: Number(prevSummaryData.totalDiscount),
            totalSettlementAmount: Number(
              prevSummaryData.totalSettlementAmount,
            ),
            totalCashReceipt: Number(prevSummaryData.totalCashReceipt),
            totalBankReceipt: Number(prevSummaryData.totalBankReceipt),
            totalPendingAmount: Number(prevSummaryData.totalPendingAmount),
          }
        : calcMonthTotals(allBookings, prevYear, prevMonth),
    [prevSummaryData, allBookings, prevYear, prevMonth],
  );

  const ytd = useMemo(
    () => calcYtd(allBookings, year, month),
    [allBookings, year, month],
  );

  const currentValues = summary
    ? {
        totalBookings: Number(summary.totalBookings),
        totalRentAmount: Number(summary.totalRentAmount),
        totalAdvanceReceived: Number(summary.totalAdvanceReceived),
        totalDiscount: Number(summary.totalDiscount),
        totalSettlementAmount: Number(summary.totalSettlementAmount),
        totalCashReceipt: Number(summary.totalCashReceipt),
        totalBankReceipt: Number(summary.totalBankReceipt),
        totalPendingAmount: Number(summary.totalPendingAmount),
      }
    : null;

  const hasSummaryData = !!currentValues && currentValues.totalBookings > 0;

  const summaryRows: Array<{
    label: string;
    key: NumericSummaryKey | "totalBookings";
    highlight?: boolean;
    isCurrency?: boolean;
  }> = [
    { label: "Total Bookings", key: "totalBookings", isCurrency: false },
    { label: "Total Rent Amount", key: "totalRentAmount" },
    { label: "Total Advance Received", key: "totalAdvanceReceived" },
    { label: "Total Discount", key: "totalDiscount" },
    { label: "Total Settlement Amount", key: "totalSettlementAmount" },
    { label: "Total Cash Receipt", key: "totalCashReceipt" },
    { label: "Total Bank Receipt", key: "totalBankReceipt" },
    {
      label: "Total Pending Amount",
      key: "totalPendingAmount",
      highlight: true,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl" data-ocid="monthly-summary-page">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            Monthly Summary
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Financial overview by month with year-to-date totals
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 self-start"
          onClick={() =>
            exportToExcel(summary, prevCalc, MONTH_NAMES[month - 1], year)
          }
          disabled={isLoading || !hasSummaryData}
          data-ocid="export-excel"
        >
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
      </div>

      {/* Period Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                Period:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="month-select"
                className="text-sm text-muted-foreground sr-only"
              >
                Month
              </label>
              <select
                id="month-select"
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                data-ocid="month-select"
              >
                {MONTH_NAMES.map((name, i) => (
                  <option key={name} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="year-select"
                className="text-sm text-muted-foreground sr-only"
              >
                Year
              </label>
              <select
                id="year-select"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                data-ocid="year-select"
              >
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {MONTH_SHORT[month - 1]} {year}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary Table */}
      <Card>
        <CardHeader className="pb-2 pt-5 px-4">
          <CardTitle className="text-base font-semibold text-foreground">
            {MONTH_NAMES[month - 1]} {year} — Summary
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            vs. {MONTH_NAMES[prevMonth - 1]} {prevYear}
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Metric
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {MONTH_SHORT[month - 1]} {year}
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  vs Prev Month
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isPrevLoading ? (
                <SkeletonRows count={8} />
              ) : !hasSummaryData ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-12 text-center text-muted-foreground"
                  >
                    <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">
                      No bookings for {MONTH_NAMES[month - 1]} {year}
                    </p>
                    <p className="text-xs mt-1">
                      Add bookings with function dates in this month to see
                      summary
                    </p>
                  </td>
                </tr>
              ) : (
                summaryRows.map((row) => {
                  const val = currentValues ? currentValues[row.key] : 0;
                  const prev = prevCalc[row.key];
                  return (
                    <SummaryTableRow
                      key={row.key}
                      label={row.label}
                      value={val}
                      prev={prev}
                      highlight={row.highlight}
                      isCurrency={row.isCurrency !== false}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Year-to-Date Summary */}
      <Card>
        <CardHeader className="pb-2 pt-5 px-4">
          <CardTitle className="text-base font-semibold text-foreground">
            Year-to-Date — {year}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Cumulative totals from Jan {year} through {MONTH_NAMES[month - 1]}{" "}
            {year}
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Metric
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  YTD Total
                </th>
              </tr>
            </thead>
            <tbody>
              {isBookingsLoading ? (
                <>
                  {SKELETON_ROW_IDS.map((id) => (
                    <tr key={id}>
                      <td className="py-2.5 pl-4">
                        <Skeleton className="h-4 w-40" />
                      </td>
                      <td className="py-2.5 pr-4">
                        <Skeleton className="h-4 w-24 ml-auto" />
                      </td>
                    </tr>
                  ))}
                </>
              ) : ytd.totalBookings === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="py-8 text-center text-muted-foreground text-sm"
                  >
                    No data available for {year}
                  </td>
                </tr>
              ) : (
                summaryRows.map((row) => {
                  const val = ytd[row.key];
                  return (
                    <SummaryTableRow
                      key={row.key}
                      label={row.label}
                      value={val}
                      highlight={row.highlight}
                      isCurrency={row.isCurrency !== false}
                    />
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Month-by-Month Overview for the year */}
      <Card>
        <CardHeader className="pb-2 pt-5 px-4">
          <CardTitle className="text-base font-semibold text-foreground">
            Monthly Breakdown — {year}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Bookings and pending amount per month
          </p>
        </CardHeader>
        <CardContent className="px-0 pb-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Month
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Bookings
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Rent
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                  Cash
                </th>
                <th className="py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Pending
                </th>
              </tr>
            </thead>
            <tbody>
              {isBookingsLoading
                ? MONTH_NAMES.map((name) => (
                    <tr key={name}>
                      <td className="py-2 pl-4">
                        <Skeleton className="h-4 w-16" />
                      </td>
                      <td className="py-2 pr-4">
                        <Skeleton className="h-4 w-10 ml-auto" />
                      </td>
                      <td className="py-2 pr-4 hidden sm:table-cell">
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </td>
                      <td className="py-2 pr-4 hidden sm:table-cell">
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </td>
                      <td className="py-2 pr-4">
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </td>
                    </tr>
                  ))
                : MONTH_NAMES.map((name, i) => {
                    const m = i + 1;
                    const totals = calcMonthTotals(allBookings, year, m);
                    const isCurrentMonth = m === month;
                    return (
                      <tr
                        key={name}
                        className={`border-b border-border last:border-0 cursor-pointer transition-colors ${
                          isCurrentMonth
                            ? "bg-primary/8 font-medium"
                            : "hover:bg-muted/30"
                        }`}
                        onClick={() => setMonth(m)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setMonth(m);
                        }}
                        tabIndex={0}
                      >
                        <td className="py-2.5 pl-4 text-sm text-foreground flex items-center gap-2">
                          {MONTH_SHORT[i]}
                          {isCurrentMonth && (
                            <Badge
                              variant="secondary"
                              className="text-xs py-0 px-1.5 h-4"
                            >
                              selected
                            </Badge>
                          )}
                        </td>
                        <td className="py-2.5 pr-4 text-right font-mono text-sm text-foreground">
                          {totals.totalBookings}
                        </td>
                        <td className="py-2.5 pr-4 text-right font-mono text-sm text-foreground hidden sm:table-cell">
                          {totals.totalBookings > 0
                            ? formatCurrency(totals.totalRentAmount)
                            : "—"}
                        </td>
                        <td className="py-2.5 pr-4 text-right font-mono text-sm text-foreground hidden sm:table-cell">
                          {totals.totalBookings > 0
                            ? formatCurrency(totals.totalCashReceipt)
                            : "—"}
                        </td>
                        <td
                          className={`py-2.5 pr-4 text-right font-mono text-sm ${totals.totalPendingAmount > 0 ? "text-destructive font-semibold" : "text-muted-foreground"}`}
                        >
                          {totals.totalBookings > 0
                            ? formatCurrency(totals.totalPendingAmount)
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
