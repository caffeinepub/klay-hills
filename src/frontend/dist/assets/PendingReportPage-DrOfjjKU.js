import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, C as CircleAlert, B as Button, S as Skeleton, f as formatCurrency, e as formatDate, a as Link, t as timestampToDate } from "./index-kAbpSd27.js";
import { B as Badge } from "./badge-C2dCPJQu.js";
import { C as Card, c as CardContent } from "./card-BbQoiGbn.js";
import { h as hallLabel, I as Input, S as Sun, M as Moon, H as HALL_OPTIONS, L as Label, P as PendingBadge } from "./BookingForm-BV_S7ps4.js";
import { D as Download, u as utils, w as writeFileSync } from "./xlsx-DGdrtGrS.js";
import { f as usePendingBookings, T as TimeOfDay } from "./backend-client-bywimUWC.js";
import { S as Search } from "./search-BN6WY2zU.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M17 14h-6", key: "bkmgh3" }],
  ["path", { d: "M13 18H7", key: "bb0bb7" }],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 18h.01", key: "1bdyru" }]
];
const CalendarRange = createLucideIcon("calendar-range", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode$2);
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
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const defaultFilters = {
  customerName: "",
  bookingDateFrom: "",
  bookingDateTo: "",
  functionDateFrom: "",
  functionDateTo: "",
  timeOfDay: "all",
  hall: "all"
};
function inDateRange(ts, fromStr, toStr) {
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
function applyFilters(bookings, f) {
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
function exportToExcel(bookings) {
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN");
  const totalPending = bookings.reduce(
    (s, b) => s + Number(b.balanceReceivable),
    0
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
    Remarks: b.remarks
  }));
  const ws = utils.json_to_sheet(rows);
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
    { wch: 28 }
  ];
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Pending Fees");
  const summaryData = [
    ["KLAY HILLS Convention Centre"],
    ["Pending Fee Report"],
    [`Generated: ${today}`],
    [""],
    ["Total Pending Bookings", bookings.length],
    ["Total Balance Receivable (INR)", totalPending],
    [
      "Day Bookings",
      bookings.filter((b) => b.timeOfDay === TimeOfDay.day).length
    ],
    [
      "Evening Bookings",
      bookings.filter((b) => b.timeOfDay === TimeOfDay.evening).length
    ]
  ];
  const wsSummary = utils.aoa_to_sheet(summaryData);
  wsSummary["!cols"] = [{ wch: 36 }, { wch: 20 }];
  utils.book_append_sheet(wb, wsSummary, "Summary");
  const fileName = `KlayHills_PendingFees_${today.replace(/\//g, "-")}.xlsx`;
  writeFileSync(wb, fileName);
}
function SummaryCards({ bookings }) {
  const totalPending = bookings.reduce(
    (s, b) => s + Number(b.balanceReceivable),
    0
  );
  const avgPending = bookings.length > 0 ? Math.round(totalPending / bookings.length) : 0;
  const uniqueClients = new Set(bookings.map((b) => b.customerName)).size;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-destructive/30 bg-destructive/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3 w-3" }),
        "Total Pending"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-destructive leading-tight", children: formatCurrency(totalPending) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-3 w-3" }),
        "Pending Bookings"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-foreground leading-tight", children: bookings.length })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3 w-3" }),
        "Avg. Balance"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-foreground leading-tight", children: formatCurrency(avgPending) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
        "Unique Clients"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-foreground leading-tight", children: uniqueClients })
    ] }) })
  ] });
}
function FilterBar({
  filters,
  onChange,
  onReset,
  onExport,
  resultCount
}) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg p-4 mb-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search customer name…",
            value: filters.customerName,
            onChange: (e) => set("customerName", e.target.value),
            className: "pl-8",
            "data-ocid": "filter-customer-name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 bg-muted rounded-md p-1 h-10", children: [
        { value: "all", label: "All" },
        { value: "day", label: "Day", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3 w-3" }) },
        {
          value: "evening",
          label: "Evening",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3 w-3" })
        }
      ].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => set("timeOfDay", opt.value),
          className: `flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition-smooth ${filters.timeOfDay === opt.value ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
          "data-ocid": `filter-time-${opt.value}`,
          children: [
            "icon" in opt && opt.icon,
            opt.label
          ]
        },
        opt.value
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.hall,
          onChange: (e) => set("hall", e.target.value),
          className: "h-10 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "data-ocid": "filter-hall",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Halls" }),
            HALL_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground mb-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: "h-3 w-3" }),
            " Booking Date From"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filters.bookingDateFrom,
              onChange: (e) => set("bookingDateFrom", e.target.value),
              className: "w-36 text-sm",
              "data-ocid": "filter-booking-date-from"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filters.bookingDateTo,
              onChange: (e) => set("bookingDateTo", e.target.value),
              className: "w-36 text-sm",
              "data-ocid": "filter-booking-date-to"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-xs text-muted-foreground mb-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: "h-3 w-3" }),
            " Function Date From"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filters.functionDateFrom,
              onChange: (e) => set("functionDateFrom", e.target.value),
              className: "w-36 text-sm",
              "data-ocid": "filter-fn-date-from"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1", children: "To" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "date",
              value: filters.functionDateTo,
              onChange: (e) => set("functionDateTo", e.target.value),
              className: "w-36 text-sm",
              "data-ocid": "filter-fn-date-to"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-auto items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: onReset,
            "data-ocid": "filter-reset",
            children: "Reset"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: onExport,
            disabled: resultCount === 0,
            className: "gap-1.5",
            "data-ocid": "export-excel-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
              "Export Excel"
            ]
          }
        )
      ] })
    ] })
  ] });
}
function PendingTable({ bookings }) {
  const totalPending = bookings.reduce(
    (s, b) => s + Number(b.balanceReceivable),
    0
  );
  if (bookings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "pending-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-12 w-12 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-foreground", children: "No pending fees found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "No bookings match your filters, or all dues are settled." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[1040px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/60 border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide w-8", children: "#" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Customer Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Booking Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Function Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Hall" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide whitespace-nowrap", children: "Rent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Advance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Discount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Settlement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2.5 font-semibold text-destructive text-xs uppercase tracking-wide whitespace-nowrap", children: "Balance Due" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wide", children: "Remarks" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bookings.map((b, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border last:border-0 hover:bg-muted/30 transition-colors",
        "data-ocid": "pending-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground font-mono text-xs", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/bookings/$id",
              params: { id: b.id.toString() },
              className: "hover:text-primary hover:underline truncate block",
              children: b.customerName
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground font-mono text-xs whitespace-nowrap", children: formatDate(b.bookingDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-foreground font-mono text-xs whitespace-nowrap", children: formatDate(b.functionDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: `text-xs gap-1 ${b.timeOfDay === TimeOfDay.day ? "border-amber-400/60 text-amber-700 dark:text-amber-400" : "border-indigo-400/60 text-indigo-700 dark:text-indigo-400"}`,
              children: [
                b.timeOfDay === TimeOfDay.day ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3 w-3" }),
                b.timeOfDay === TimeOfDay.day ? "Day" : "Evening"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "secondary",
              className: "text-xs whitespace-nowrap",
              children: hallLabel(b.hall)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap", children: formatCurrency(Number(b.rentAmount)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap", children: formatCurrency(Number(b.advanceReceived)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap", children: formatCurrency(Number(b.discount)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-mono text-xs text-foreground whitespace-nowrap", children: formatCurrency(Number(b.settlementAmount)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PendingBadge, { amount: Number(b.balanceReceivable) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-muted-foreground text-xs max-w-[140px] truncate", children: b.remarks || "—" })
        ]
      },
      b.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tfoot", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-destructive/5 border-t-2 border-destructive/30 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 10, className: "px-3 py-3 text-sm text-foreground", children: [
        "Total — ",
        bookings.length,
        " booking",
        bookings.length !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "balance-highlight font-mono text-base", children: formatCurrency(totalPending) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", {})
    ] }) })
  ] }) });
}
function LoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "loading-state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ["sk1", "sk2", "sk3", "sk4"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, sk)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 w-full rounded-lg" })
  ] });
}
function PendingReportPage() {
  const { data: allPending = [], isLoading } = usePendingBookings();
  const [filters, setFilters] = reactExports.useState(defaultFilters);
  const filtered = reactExports.useMemo(
    () => applyFilters(allPending, filters),
    [allPending, filters]
  );
  const generatedDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-screen-xl mx-auto px-4 py-6 print:px-2 print:py-2",
      "data-ocid": "pending-report-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-6 w-6 text-destructive shrink-0" }),
              "Pending Fee Report"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              "KLAY HILLS Convention Centre  ·  Generated:",
              " ",
              generatedDate
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => window.print(),
              className: "gap-1.5 print:hidden shrink-0",
              "data-ocid": "print-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }),
                "Print"
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCards, { bookings: filtered }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            FilterBar,
            {
              filters,
              onChange: setFilters,
              onReset: () => setFilters(defaultFilters),
              onExport: () => exportToExcel(filtered),
              resultCount: filtered.length
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:block text-xs text-muted-foreground mb-3", children: [
            "Customer: ",
            filters.customerName || "All",
            "  |  Time:",
            " ",
            filters.timeOfDay,
            "  |  Hall:",
            " ",
            filters.hall === "all" ? "All" : hallLabel(filters.hall),
            " ",
            " |  Showing ",
            filtered.length,
            " booking",
            filtered.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PendingTable, { bookings: filtered })
        ] })
      ]
    }
  );
}
export {
  PendingReportPage as default
};
