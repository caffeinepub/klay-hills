import { formatCurrency } from "../lib/utils";

interface PendingBadgeProps {
  amount: bigint | number;
  className?: string;
}

export function PendingBadge({ amount, className = "" }: PendingBadgeProps) {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  if (num <= 0) {
    return (
      <span
        className={`font-mono text-sm font-semibold text-accent ${className}`}
      >
        {formatCurrency(0)}
      </span>
    );
  }
  return (
    <span
      className={`balance-highlight font-mono text-sm ${className}`}
      data-ocid="pending-badge"
    >
      {formatCurrency(num)}
    </span>
  );
}
