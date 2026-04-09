import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Hall, TimeOfDay } from "../backend";
import {
  calcBalanceReceivable,
  dateToTimestamp,
  formatCurrency,
  formatDateInput,
} from "../lib/utils";
import type { Booking, BookingInput } from "../types";
import { PendingBadge } from "./PendingBadge";

interface BookingFormProps {
  initialData?: Booking;
  onSubmit: (input: BookingInput) => Promise<void>;
  onCancel?: () => void;
  isLoading: boolean;
  submitLabel: string;
}

function toNum(v: string): bigint {
  const n = Number.parseInt(v.replace(/[^0-9]/g, ""), 10);
  return BigInt(Number.isNaN(n) ? 0 : n);
}

export const HALL_OPTIONS: { value: Hall; label: string }[] = [
  { value: Hall.tileFactory, label: "Tile Factory" },
  { value: Hall.terra, label: "Terra" },
  { value: Hall.frenchHall, label: "French Hall" },
  { value: Hall.businessHall, label: "Business Hall" },
  { value: Hall.others, label: "Others" },
];

export function hallLabel(hall: Hall): string {
  return HALL_OPTIONS.find((o) => o.value === hall)?.label ?? hall;
}

export function BookingForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: BookingFormProps) {
  const [customerName, setCustomerName] = useState(
    initialData?.customerName ?? "",
  );
  const [bookingDate, setBookingDate] = useState(
    initialData
      ? formatDateInput(initialData.bookingDate)
      : new Date().toISOString().slice(0, 10),
  );
  const [functionDate, setFunctionDate] = useState(
    initialData ? formatDateInput(initialData.functionDate) : "",
  );
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(
    initialData?.timeOfDay ?? TimeOfDay.day,
  );
  const [hall, setHall] = useState<Hall>(initialData?.hall ?? Hall.tileFactory);
  const [rentAmount, setRentAmount] = useState(
    String(initialData ? Number(initialData.rentAmount) : ""),
  );
  const [advanceReceived, setAdvanceReceived] = useState(
    String(initialData ? Number(initialData.advanceReceived) : ""),
  );
  const [discount, setDiscount] = useState(
    String(initialData ? Number(initialData.discount) : ""),
  );
  const [settlementAmount, setSettlementAmount] = useState(
    String(initialData ? Number(initialData.settlementAmount) : ""),
  );
  const [totalCashReceipt, setTotalCashReceipt] = useState(
    String(initialData ? Number(initialData.totalCashReceipt) : ""),
  );
  const [totalBankReceipt, setTotalBankReceipt] = useState(
    String(initialData ? Number(initialData.totalBankReceipt) : ""),
  );
  const [remarks, setRemarks] = useState(initialData?.remarks ?? "");

  const balance = calcBalanceReceivable(
    toNum(rentAmount),
    toNum(advanceReceived),
    toNum(discount),
    toNum(settlementAmount),
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !bookingDate || !functionDate) return;
    const input: BookingInput = {
      customerName: customerName.trim(),
      bookingDate: dateToTimestamp(new Date(bookingDate)),
      functionDate: dateToTimestamp(new Date(functionDate)),
      timeOfDay,
      hall,
      rentAmount: toNum(rentAmount),
      advanceReceived: toNum(advanceReceived),
      discount: toNum(discount),
      settlementAmount: toNum(settlementAmount),
      totalCashReceipt: toNum(totalCashReceipt),
      totalBankReceipt: toNum(totalBankReceipt),
      remarks: remarks.trim(),
    };
    await onSubmit(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-ocid="booking-form"
    >
      {/* Customer & Dates */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Customer & Date
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="customerName">
                Customer Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
                data-ocid="booking-customer-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bookingDate">
                Booking Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                data-ocid="booking-date"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="functionDate">
                Function Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="functionDate"
                type="date"
                value={functionDate}
                onChange={(e) => setFunctionDate(e.target.value)}
                required
                data-ocid="booking-function-date"
              />
            </div>
          </div>

          {/* Time of Day toggle */}
          <div className="space-y-1.5">
            <Label>
              Time of Day <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center border border-border rounded-md overflow-hidden w-fit">
              <button
                type="button"
                onClick={() => setTimeOfDay(TimeOfDay.day)}
                className={`px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-smooth ${
                  timeOfDay === TimeOfDay.day
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"
                }`}
                data-ocid="toggle-day"
              >
                <Sun className="h-4 w-4" /> Day
              </button>
              <button
                type="button"
                onClick={() => setTimeOfDay(TimeOfDay.evening)}
                className={`px-5 py-2.5 text-sm font-medium flex items-center gap-2 border-l border-border transition-smooth ${
                  timeOfDay === TimeOfDay.evening
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"
                }`}
                data-ocid="toggle-evening"
              >
                <Moon className="h-4 w-4" /> Evening
              </button>
            </div>
          </div>

          {/* Hall dropdown */}
          <div className="space-y-1.5">
            <Label htmlFor="hall">
              Hall <span className="text-destructive">*</span>
            </Label>
            <select
              id="hall"
              value={hall}
              onChange={(e) => setHall(e.target.value as Hall)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              data-ocid="booking-hall"
            >
              {HALL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardContent className="p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Financial Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="rentAmount">
                Rent Amount (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="rentAmount"
                type="number"
                min="0"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                placeholder="0"
                data-ocid="booking-rent"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="advanceReceived">Advance Received (₹)</Label>
              <Input
                id="advanceReceived"
                type="number"
                min="0"
                value={advanceReceived}
                onChange={(e) => setAdvanceReceived(e.target.value)}
                placeholder="0"
                data-ocid="booking-advance"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="discount">Discount (₹)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
                data-ocid="booking-discount"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settlementAmount">Settlement Amount (₹)</Label>
              <Input
                id="settlementAmount"
                type="number"
                min="0"
                value={settlementAmount}
                onChange={(e) => setSettlementAmount(e.target.value)}
                placeholder="0"
                data-ocid="booking-settlement"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="totalCashReceipt">Total Cash Receipt (₹)</Label>
              <Input
                id="totalCashReceipt"
                type="number"
                min="0"
                value={totalCashReceipt}
                onChange={(e) => setTotalCashReceipt(e.target.value)}
                placeholder="0"
                data-ocid="booking-cash"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="totalBankReceipt">Total Bank Receipt (₹)</Label>
              <Input
                id="totalBankReceipt"
                type="number"
                min="0"
                value={totalBankReceipt}
                onChange={(e) => setTotalBankReceipt(e.target.value)}
                placeholder="0"
                data-ocid="booking-bank"
              />
            </div>
          </div>

          {/* Live balance */}
          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${balance > 0 ? "border-destructive/30 bg-destructive/5" : "border-border bg-muted/30"}`}
            data-ocid="balance-summary"
          >
            <div>
              <span className="text-sm font-medium text-foreground">
                Balance Receivable
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Rent − Advance − Discount − Settlement
              </p>
            </div>
            <PendingBadge amount={balance} className="text-base" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Optional notes about this booking…"
              rows={3}
              data-ocid="booking-remarks"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={isLoading || !customerName || !bookingDate || !functionDate}
          data-ocid="booking-submit"
        >
          {isLoading ? "Saving…" : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            data-ocid="booking-cancel"
          >
            Cancel
          </Button>
        )}
        <span className="text-muted-foreground text-xs ml-auto">
          Balance = {formatCurrency(balance)}
        </span>
      </div>
    </form>
  );
}
