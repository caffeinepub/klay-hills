import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BadgeDollarSign,
  Banknote,
  BookOpen,
  CalendarDays,
  Clock,
  FileBarChart2,
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  UploadCloud,
  Wallet,
} from "lucide-react";
import { useAllBookings, useDashboardStats } from "../lib/backend-client";
import {
  calcBalanceReceivable,
  formatCurrency,
  formatDate,
} from "../lib/utils";
import type { Booking, TimeOfDay } from "../types";

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant?: "default" | "pending";
  loading?: boolean;
  subtitle?: string;
}

function StatCard({
  title,
  value,
  icon,
  variant = "default",
  loading,
  subtitle,
}: StatCardProps) {
  const isPending = variant === "pending";
  return (
    <Card
      className="relative overflow-hidden border-border"
      data-ocid="stat-card"
    >
      <CardHeader className="pb-2 pt-4 px-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {title}
          </CardTitle>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              isPending
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary"
            }`}
          >
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        {loading ? (
          <Skeleton className="h-8 w-28 mt-1" />
        ) : (
          <p
            className={`font-mono text-2xl font-bold tracking-tight ${
              isPending ? "text-destructive" : "text-foreground"
            }`}
          >
            {value}
          </p>
        )}
        {subtitle && !loading && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
      {isPending && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-destructive/40" />
      )}
    </Card>
  );
}

// ─── Time Badge ───────────────────────────────────────────────────────────────

function TimeBadge({ time }: { time: TimeOfDay }) {
  const isDay = time === "day";
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${
        isDay
          ? "border-amber-300 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
          : "border-indigo-300 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400"
      }`}
    >
      {isDay ? "☀ Day" : "🌙 Evening"}
    </Badge>
  );
}

// ─── Table Skeleton Rows ──────────────────────────────────────────────────────

function TableSkeletonRows() {
  return (
    <>
      {["r0", "r1", "r2", "r3", "r4"].map((rk) => (
        <TableRow key={rk}>
          {["c0", "c1", "c2", "c3", "c4", "c5"].map((ck) => (
            <TableCell key={ck}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ─── Recent Bookings Table ────────────────────────────────────────────────────

function RecentBookingsTable({
  bookings,
  loading,
}: { bookings: Booking[]; loading: boolean }) {
  const recent = bookings
    .slice()
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    .slice(0, 10);

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="font-semibold text-xs uppercase tracking-wide">
              Customer Name
            </TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">
              Function Date
            </TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wide">
              Time
            </TableHead>
            <TableHead className="text-right font-semibold text-xs uppercase tracking-wide">
              Rent Amount
            </TableHead>
            <TableHead className="text-right font-semibold text-xs uppercase tracking-wide">
              Balance Receivable
            </TableHead>
            <TableHead className="text-right font-semibold text-xs uppercase tracking-wide">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableSkeletonRows />
          ) : recent.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <div
                  className="flex flex-col items-center gap-3"
                  data-ocid="dashboard-empty"
                >
                  <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm font-medium text-muted-foreground">
                    No bookings yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Start by creating your first booking
                  </p>
                  <Button asChild size="sm">
                    <Link to="/bookings/new">+ New Booking</Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            recent.map((booking) => {
              const balance = calcBalanceReceivable(
                booking.rentAmount,
                booking.advanceReceived,
                booking.discount,
                booking.settlementAmount,
              );
              const isPending = balance > 0;
              return (
                <TableRow
                  key={String(booking.id)}
                  className="transition-smooth hover:bg-muted/30"
                  data-ocid="booking-row"
                >
                  <TableCell className="font-medium">
                    <Link
                      to="/bookings/$id"
                      params={{ id: String(booking.id) }}
                      className="text-primary hover:underline"
                    >
                      {booking.customerName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(booking.functionDate)}
                  </TableCell>
                  <TableCell>
                    <TimeBadge time={booking.timeOfDay} />
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(booking.rentAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-sm font-semibold ${
                        isPending ? "balance-highlight" : "text-accent"
                      }`}
                    >
                      {formatCurrency(balance)}
                      {isPending && <AlertCircle className="h-3 w-3" />}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link
                        to="/bookings/$id"
                        params={{ id: String(booking.id) }}
                      >
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Quick Link Card ──────────────────────────────────────────────────────────

function QuickLink({
  to,
  icon,
  label,
  description,
  highlight,
  ocid,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  highlight?: boolean;
  ocid: string;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-lg border p-4 transition-smooth hover:shadow-sm ${
        highlight
          ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/10"
          : "border-border bg-card hover:bg-muted/50"
      }`}
      data-ocid={ocid}
    >
      <div
        className={`shrink-0 ${highlight ? "text-destructive" : "text-primary"}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {label}
        </p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: bookings = [], isLoading: bookingsLoading } = useAllBookings();

  const hasPendingAmount = Number(stats?.totalPendingAmount ?? 0) > 0;

  return (
    <div className="space-y-8" data-ocid="dashboard-page">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display flex items-center gap-2 text-2xl font-bold text-foreground sm:text-3xl">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            Dashboard
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            KLAY HILLS Convention Centre Overview
          </p>
        </div>
        <Button asChild data-ocid="add-booking-btn">
          <Link to="/bookings/new">+ New Booking</Link>
        </Button>
      </div>

      {/* Stat Cards — 1 col mobile / 2 cols tablet / 4 cols desktop */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        data-ocid="stats-grid"
      >
        <StatCard
          title="Total Bookings"
          value={stats ? String(Number(stats.totalBookings)) : "—"}
          icon={<TrendingUp className="h-4 w-4" />}
          loading={statsLoading}
          subtitle="All time entries"
        />
        <StatCard
          title="Cash Receipts"
          value={stats ? formatCurrency(stats.totalCashReceipt) : "—"}
          icon={<Banknote className="h-4 w-4" />}
          loading={statsLoading}
          subtitle="Cash payments received"
        />
        <StatCard
          title="Bank Receipts"
          value={stats ? formatCurrency(stats.totalBankReceipt) : "—"}
          icon={<BadgeDollarSign className="h-4 w-4" />}
          loading={statsLoading}
          subtitle="Bank transfers received"
        />
        <StatCard
          title="Pending Bookings"
          value={stats ? String(Number(stats.pendingBookingsCount)) : "—"}
          icon={<Clock className="h-4 w-4" />}
          variant={
            Number(stats?.pendingBookingsCount ?? 0) > 0 ? "pending" : "default"
          }
          loading={statsLoading}
          subtitle="Awaiting balance clearance"
        />
        <StatCard
          title="Total Pending Amount"
          value={stats ? formatCurrency(stats.totalPendingAmount) : "—"}
          icon={
            hasPendingAmount ? (
              <TrendingDown className="h-4 w-4" />
            ) : (
              <Wallet className="h-4 w-4" />
            )
          }
          variant={hasPendingAmount ? "pending" : "default"}
          loading={statsLoading}
          subtitle="Outstanding balance due"
        />
      </div>

      {/* Pending Alert Banner */}
      {!statsLoading && hasPendingAmount && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
            <p className="text-sm font-medium text-destructive">
              {formatCurrency(stats!.totalPendingAmount)} pending across{" "}
              {Number(stats!.pendingBookingsCount)} booking(s) — action required
            </p>
          </div>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            <Link to="/pending-report">View Report</Link>
          </Button>
        </div>
      )}

      {/* Recent Bookings Table */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Recent Bookings
            </h2>
            <p className="text-sm text-muted-foreground">
              Latest 10 entries · balance shown in{" "}
              <span className="font-semibold text-destructive">red</span> if
              pending
            </p>
          </div>
          <Button asChild variant="outline" size="sm" data-ocid="view-all-btn">
            <Link to="/bookings">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <RecentBookingsTable bookings={bookings} loading={bookingsLoading} />
      </section>

      {/* Quick Links */}
      <section className="rounded-xl bg-muted/30 p-5">
        <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink
            to="/pending-report"
            icon={<AlertCircle className="h-5 w-5" />}
            label="Pending Fee Report"
            description="View outstanding balances"
            highlight
            ocid="quick-link-pending"
          />
          <QuickLink
            to="/bookings"
            icon={<CalendarDays className="h-5 w-5" />}
            label="All Bookings"
            description="Manage all entries"
            ocid="quick-link-bookings"
          />
          <QuickLink
            to="/monthly-summary"
            icon={<FileBarChart2 className="h-5 w-5" />}
            label="Monthly Summary"
            description="Revenue & booking trends"
            ocid="quick-link-monthly"
          />
          <QuickLink
            to="/import-export"
            icon={<UploadCloud className="h-5 w-5" />}
            label="Import / Export"
            description="Bulk Excel import & export"
            ocid="quick-link-import"
          />
        </div>
      </section>
    </div>
  );
}
