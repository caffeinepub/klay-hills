import { h as useParams, g as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, a as Link, A as ArrowLeft, f as formatCurrency, e as formatDate, u as ue } from "./index-kAbpSd27.js";
import { P as Pencil, T as Trash2, A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-MAW6zi1z.js";
import { B as Badge } from "./badge-C2dCPJQu.js";
import { C as Card, c as CardContent } from "./card-BbQoiGbn.js";
import { d as useBooking, b as useDeleteBooking, T as TimeOfDay } from "./backend-client-bywimUWC.js";
import { S as Sun, M as Moon, h as hallLabel, P as PendingBadge } from "./BookingForm-BV_S7ps4.js";
import "./index-DDpRJb7d.js";
function DetailRow({
  label,
  value,
  isBalance = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2.5 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-sm font-medium ${isBalance ? "" : "text-foreground"}`,
        children: value
      }
    )
  ] });
}
function BookingDetailPage() {
  const { id } = useParams({ from: "/app/bookings/$id" });
  const bookingId = BigInt(id);
  const { data: booking, isLoading } = useBooking(bookingId);
  const deleteMutation = useDeleteBooking();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(bookingId);
      ue.success("Booking deleted");
      navigate({ to: "/bookings" });
    } catch {
      ue.error("Failed to delete booking");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-96 w-full" })
    ] });
  }
  if (!booking) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Booking not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-4", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bookings", children: "Back to Bookings" }) })
    ] });
  }
  const balance = Number(booking.balanceReceivable);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-2xl", "data-ocid": "booking-detail-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: () => navigate({ to: "/bookings" }),
            "aria-label": "Back to bookings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground truncate", children: booking.customerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
            "Booking #",
            booking.id.toString()
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bookings/$id/edit", params: { id }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 mr-1.5" }),
          " Edit"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "text-destructive border-destructive/30 hover:bg-destructive/10",
            onClick: () => setShowDelete(true),
            "data-ocid": "delete-booking-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1.5" }),
              " Delete"
            ]
          }
        )
      ] })
    ] }),
    balance > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-destructive/40 bg-destructive/5 p-4 flex items-center justify-between",
        "data-ocid": "balance-receivable-highlight",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wide text-destructive", children: "⚠ Balance Receivable" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Payment outstanding from customer" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-mono text-destructive", children: formatCurrency(balance) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Customer Name", value: booking.customerName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Booking Date",
          value: formatDate(booking.bookingDate)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Function Date",
          value: formatDate(booking.functionDate)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Time of Day",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: booking.timeOfDay === TimeOfDay.day ? "border-amber-500/50 text-amber-700" : "border-indigo-500/50 text-indigo-700",
              children: booking.timeOfDay === TimeOfDay.day ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3 w-3 mr-1" }),
                "Day"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3 w-3 mr-1" }),
                "Evening"
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Hall",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: hallLabel(booking.hall) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Rent Amount",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(booking.rentAmount) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Advance Received",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(booking.advanceReceived) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Discount",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(booking.discount) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Settlement Amount",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(booking.settlementAmount) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Total Cash Receipt",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(booking.totalCashReceipt) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Total Bank Receipt",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: formatCurrency(booking.totalBankReceipt) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Balance Receivable",
          isBalance: true,
          value: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingBadge, { amount: booking.balanceReceivable })
        }
      ),
      booking.remarks && /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailRow,
        {
          label: "Remarks",
          value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right max-w-xs break-words", children: booking.remarks })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDelete, onOpenChange: setShowDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Booking?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This action cannot be undone. The booking for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: booking.customerName }),
          " will be permanently removed."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            onClick: handleDelete,
            "data-ocid": "confirm-delete-btn",
            children: deleteMutation.isPending ? "Deleting…" : "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  BookingDetailPage as default
};
