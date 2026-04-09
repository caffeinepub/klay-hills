import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as CalendarDays, B as Button, a as Link, S as Skeleton, u as ue, e as formatDate, f as formatCurrency } from "./index-kAbpSd27.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction, P as Pencil, T as Trash2 } from "./alert-dialog-MAW6zi1z.js";
import { B as Badge } from "./badge-C2dCPJQu.js";
import { C as Card, c as CardContent } from "./card-BbQoiGbn.js";
import { I as Input, S as Sun, M as Moon, H as HALL_OPTIONS, h as hallLabel, P as PendingBadge } from "./BookingForm-BV_S7ps4.js";
import { a as useAllBookings, b as useDeleteBooking, T as TimeOfDay } from "./backend-client-bywimUWC.js";
import { S as Search } from "./search-BN6WY2zU.js";
import "./index-DDpRJb7d.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const PAGE_SIZE = 20;
function BookingsPage() {
  const { data: bookings = [], isLoading } = useAllBookings();
  const deleteMutation = useDeleteBooking();
  const [search, setSearch] = reactExports.useState("");
  const [timeFilter, setTimeFilter] = reactExports.useState("all");
  const [hallFilter, setHallFilter] = reactExports.useState("all");
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [deleteCustomer, setDeleteCustomer] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    let list = bookings;
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
      const start = new Date(startDate).getTime() * 1e6;
      list = list.filter((b) => Number(b.functionDate) >= start);
    }
    if (endDate) {
      const end = (new Date(endDate).getTime() + 864e5) * 1e6;
      list = list.filter((b) => Number(b.functionDate) <= end);
    }
    return list;
  }, [bookings, search, timeFilter, hallFilter, startDate, endDate]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const onTimeFilter = (t) => {
    setTimeFilter(t);
    setPage(1);
  };
  const onHallFilter = (h) => {
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
      ue.success("Booking deleted");
    } catch {
      ue.error("Failed to delete booking");
    } finally {
      setDeleteId(null);
      setDeleteCustomer("");
    }
  };
  const hasFilters = search || timeFilter !== "all" || hallFilter !== "all" || startDate || endDate;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "bookings-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3 justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-6 w-6 text-primary" }),
          "Bookings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: isLoading ? "Loading…" : `${filtered.length} of ${bookings.length} bookings` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "new-booking-btn", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bookings/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
        " New Booking"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search customer name…",
              value: search,
              onChange: onSearch,
              className: "pl-9",
              "data-ocid": "booking-search"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center border border-border rounded-md overflow-hidden shrink-0",
            "data-ocid": "time-filter-toggle",
            children: ["all", TimeOfDay.day, TimeOfDay.evening].map(
              (t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onTimeFilter(t),
                  className: `px-3 py-2 text-sm font-medium flex items-center gap-1.5 transition-smooth border-r border-border last:border-r-0 ${timeFilter === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
                  "data-ocid": `filter-time-${t}`,
                  children: t === "all" ? "All" : t === TimeOfDay.day ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3.5 w-3.5" }),
                    " Day"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3.5 w-3.5" }),
                    " Evening"
                  ] })
                },
                t
              )
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: hallFilter,
            onChange: (e) => onHallFilter(e.target.value),
            className: "h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring shrink-0",
            "data-ocid": "filter-hall",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Halls" }),
              HALL_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: "Function date:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: startDate,
            onChange: (e) => {
              setStartDate(e.target.value);
              setPage(1);
            },
            className: "w-36",
            "data-ocid": "filter-start-date"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "to" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: endDate,
            onChange: (e) => {
              setEndDate(e.target.value);
              setPage(1);
            },
            className: "w-36",
            "data-ocid": "filter-end-date"
          }
        ),
        hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: clearFilters,
            "data-ocid": "btn-clear-filters",
            children: "Clear filters"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, i)) }) : paged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", "data-ocid": "bookings-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-12 w-12 text-muted-foreground mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No bookings found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: hasFilters ? "Try adjusting your filters" : "Create your first booking to get started" }),
        !hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bookings/new", children: "+ New Booking" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: [
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
          { label: "Actions", align: "center" }
        ].map(({ label, align }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: `py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap text-${align}`,
            children: label
          },
          label
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paged.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingTableRow,
          {
            booking: b,
            onDelete: () => {
              setDeleteId(b.id);
              setDeleteCustomer(b.customerName);
            }
          },
          b.id.toString()
        )) })
      ] }) }) }),
      !isLoading && filtered.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          (page - 1) * PAGE_SIZE + 1,
          "–",
          Math.min(page * PAGE_SIZE, filtered.length),
          " of ",
          filtered.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              disabled: page === 1,
              "aria-label": "Previous page",
              "data-ocid": "btn-prev-page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 text-sm font-medium", children: [
            page,
            " / ",
            totalPages
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
              disabled: page === totalPages,
              "aria-label": "Next page",
              "data-ocid": "btn-next-page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: deleteId !== null,
        onOpenChange: () => {
          setDeleteId(null);
          setDeleteCustomer("");
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Booking?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "This action cannot be undone. The booking for",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteCustomer }),
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
        ] })
      }
    )
  ] });
}
function BookingTableRow({
  booking,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/30 transition-colors",
      "data-ocid": "booking-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 font-medium text-foreground whitespace-nowrap", children: booking.customerName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap", children: formatDate(booking.bookingDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap", children: formatDate(booking.functionDate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: `text-xs ${booking.timeOfDay === TimeOfDay.day ? "border-amber-500/50 text-amber-700" : "border-indigo-500/50 text-indigo-700"}`,
            children: [
              booking.timeOfDay === TimeOfDay.day ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3 w-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3 w-3 mr-1" }),
              booking.timeOfDay === TimeOfDay.day ? "Day" : "Evening"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs whitespace-nowrap", children: hallLabel(booking.hall) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: formatCurrency(booking.rentAmount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: formatCurrency(booking.advanceReceived) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: formatCurrency(booking.discount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right font-mono", children: formatCurrency(booking.settlementAmount) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingBadge, { amount: booking.balanceReceivable }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3 text-muted-foreground max-w-[140px] truncate", children: booking.remarks || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "icon", className: "h-7 w-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/bookings/$id", params: { id: booking.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "icon", className: "h-7 w-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/bookings/$id/edit",
              params: { id: booking.id.toString() },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-destructive hover:bg-destructive/10",
              onClick: onDelete,
              "aria-label": "Delete booking",
              "data-ocid": "delete-booking-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  BookingsPage as default
};
