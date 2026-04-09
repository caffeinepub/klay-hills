import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupees
 */
export function formatCurrency(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format a timestamp (nanoseconds from backend) to DD/MM/YYYY
 */
export function formatDate(ts: bigint | number): string {
  const ms = typeof ts === "bigint" ? Number(ts) / 1_000_000 : ts / 1_000_000;
  const date = new Date(ms);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Convert a JS Date to a backend Timestamp (nanoseconds)
 */
export function dateToTimestamp(date: Date): bigint {
  return BigInt(date.getTime()) * 1_000_000n;
}

/**
 * Convert a backend Timestamp (nanoseconds) to a JS Date
 */
export function timestampToDate(ts: bigint): Date {
  return new Date(Number(ts) / 1_000_000);
}

/**
 * Calculate the balance receivable
 */
export function calcBalanceReceivable(
  rent: bigint,
  advance: bigint,
  discount: bigint,
  settlement: bigint,
): number {
  return Number(rent) - Number(advance) - Number(discount) - Number(settlement);
}

/**
 * Format a date to YYYY-MM-DD for input[type=date]
 */
export function formatDateInput(ts: bigint): string {
  const date = timestampToDate(ts);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
