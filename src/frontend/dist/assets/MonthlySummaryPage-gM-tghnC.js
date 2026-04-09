import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, n as ChartColumn, B as Button, S as Skeleton, f as formatCurrency } from "./index-kAbpSd27.js";
import { B as Badge } from "./badge-C2dCPJQu.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-BbQoiGbn.js";
import { D as Download, u as utils, w as writeFileSync } from "./xlsx-DGdrtGrS.js";
import { g as useMonthlySummary, a as useAllBookings } from "./backend-client-bywimUWC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
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
  "December"
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
  "Dec"
];
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
const YEAR_OPTIONS = [
  currentYear,
  currentYear - 1,
  currentYear - 2,
  currentYear - 3
];
function calcYtd(bookings, year, upToMonth) {
  const filtered = bookings.filter((b) => {
    const d = new Date(Number(b.functionDate) / 1e6);
    return d.getFullYear() === year && d.getMonth() + 1 <= upToMonth;
  });
  return {
    totalBookings: filtered.length,
    totalRentAmount: filtered.reduce((s, b) => s + Number(b.rentAmount), 0),
    totalAdvanceReceived: filtered.reduce(
      (s, b) => s + Number(b.advanceReceived),
      0
    ),
    totalDiscount: filtered.reduce((s, b) => s + Number(b.discount), 0),
    totalSettlementAmount: filtered.reduce(
      (s, b) => s + Number(b.settlementAmount),
      0
    ),
    totalCashReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalCashReceipt),
      0
    ),
    totalBankReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalBankReceipt),
      0
    ),
    totalPendingAmount: filtered.reduce(
      (s, b) => s + Number(b.balanceReceivable),
      0
    )
  };
}
function calcMonthTotals(bookings, year, month) {
  const filtered = bookings.filter((b) => {
    const d = new Date(Number(b.functionDate) / 1e6);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
  return {
    totalBookings: filtered.length,
    totalRentAmount: filtered.reduce((s, b) => s + Number(b.rentAmount), 0),
    totalAdvanceReceived: filtered.reduce(
      (s, b) => s + Number(b.advanceReceived),
      0
    ),
    totalDiscount: filtered.reduce((s, b) => s + Number(b.discount), 0),
    totalSettlementAmount: filtered.reduce(
      (s, b) => s + Number(b.settlementAmount),
      0
    ),
    totalCashReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalCashReceipt),
      0
    ),
    totalBankReceipt: filtered.reduce(
      (s, b) => s + Number(b.totalBankReceipt),
      0
    ),
    totalPendingAmount: filtered.reduce(
      (s, b) => s + Number(b.balanceReceivable),
      0
    )
  };
}
function DeltaBadge({ current, prev }) {
  if (prev === 0 && current === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "—" });
  const delta = current - prev;
  if (delta === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }),
      " 0%"
    ] });
  const pct = prev === 0 ? 100 : Math.abs(Math.round(delta / prev * 100));
  const isUp = delta > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`,
      children: [
        isUp ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" }),
        pct,
        "%"
      ]
    }
  );
}
function SummaryTableRow({
  label,
  value,
  prev,
  highlight = false,
  isCurrency = true
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0 hover:bg-muted/30 transition-colors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pl-4 text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "td",
      {
        className: `py-3 pr-4 text-right font-mono text-sm font-semibold ${highlight && value > 0 ? "text-destructive" : "text-foreground"}`,
        children: isCurrency ? formatCurrency(value) : String(value)
      }
    ),
    prev !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 pr-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeltaBadge, { current: value, prev }) })
  ] });
}
const SKELETON_ROW_IDS = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];
function SkeletonRows({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: SKELETON_ROW_IDS.slice(0, count).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pl-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 ml-auto" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-12 ml-auto" }) })
  ] }, id)) });
}
function exportToExcel(summary, prevSummary, monthName, year) {
  const current = summary ? {
    totalBookings: Number(summary.totalBookings),
    totalRentAmount: Number(summary.totalRentAmount),
    totalAdvanceReceived: Number(summary.totalAdvanceReceived),
    totalDiscount: Number(summary.totalDiscount),
    totalSettlementAmount: Number(summary.totalSettlementAmount),
    totalCashReceipt: Number(summary.totalCashReceipt),
    totalBankReceipt: Number(summary.totalBankReceipt),
    totalPendingAmount: Number(summary.totalPendingAmount)
  } : null;
  const rows = [
    ["KLAY HILLS – Monthly Summary Report"],
    [`Period: ${monthName} ${year}`],
    [`Generated: ${(/* @__PURE__ */ new Date()).toLocaleString("en-IN")}`],
    [],
    ["Metric", `${monthName} ${year}`, "Previous Month", "Change"],
    [
      "Total Bookings",
      (current == null ? void 0 : current.totalBookings) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalBookings) ?? 0,
      ((current == null ? void 0 : current.totalBookings) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalBookings) ?? 0)
    ],
    [
      "Total Rent Amount (₹)",
      (current == null ? void 0 : current.totalRentAmount) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalRentAmount) ?? 0,
      ((current == null ? void 0 : current.totalRentAmount) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalRentAmount) ?? 0)
    ],
    [
      "Total Advance Received (₹)",
      (current == null ? void 0 : current.totalAdvanceReceived) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalAdvanceReceived) ?? 0,
      ((current == null ? void 0 : current.totalAdvanceReceived) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalAdvanceReceived) ?? 0)
    ],
    [
      "Total Discount (₹)",
      (current == null ? void 0 : current.totalDiscount) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalDiscount) ?? 0,
      ((current == null ? void 0 : current.totalDiscount) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalDiscount) ?? 0)
    ],
    [
      "Total Settlement Amount (₹)",
      (current == null ? void 0 : current.totalSettlementAmount) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalSettlementAmount) ?? 0,
      ((current == null ? void 0 : current.totalSettlementAmount) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalSettlementAmount) ?? 0)
    ],
    [
      "Total Cash Receipt (₹)",
      (current == null ? void 0 : current.totalCashReceipt) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalCashReceipt) ?? 0,
      ((current == null ? void 0 : current.totalCashReceipt) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalCashReceipt) ?? 0)
    ],
    [
      "Total Bank Receipt (₹)",
      (current == null ? void 0 : current.totalBankReceipt) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalBankReceipt) ?? 0,
      ((current == null ? void 0 : current.totalBankReceipt) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalBankReceipt) ?? 0)
    ],
    [
      "Total Pending Amount (₹)",
      (current == null ? void 0 : current.totalPendingAmount) ?? 0,
      (prevSummary == null ? void 0 : prevSummary.totalPendingAmount) ?? 0,
      ((current == null ? void 0 : current.totalPendingAmount) ?? 0) - ((prevSummary == null ? void 0 : prevSummary.totalPendingAmount) ?? 0)
    ]
  ];
  const ws = utils.aoa_to_sheet(rows);
  ws["!cols"] = [{ wch: 32 }, { wch: 20 }, { wch: 20 }, { wch: 16 }];
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Monthly Summary");
  writeFileSync(wb, `KlayHills_${monthName}_${year}_Summary.xlsx`);
}
function MonthlySummaryPage() {
  const now = /* @__PURE__ */ new Date();
  const [year, setYear] = reactExports.useState(now.getFullYear());
  const [month, setMonth] = reactExports.useState(now.getMonth() + 1);
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const { data: summary, isLoading } = useMonthlySummary(year, month);
  const { data: prevSummaryData, isLoading: isPrevLoading } = useMonthlySummary(
    prevYear,
    prevMonth
  );
  const { data: allBookings = [], isLoading: isBookingsLoading } = useAllBookings();
  const prevCalc = reactExports.useMemo(
    () => prevSummaryData ? {
      totalBookings: Number(prevSummaryData.totalBookings),
      totalRentAmount: Number(prevSummaryData.totalRentAmount),
      totalAdvanceReceived: Number(prevSummaryData.totalAdvanceReceived),
      totalDiscount: Number(prevSummaryData.totalDiscount),
      totalSettlementAmount: Number(
        prevSummaryData.totalSettlementAmount
      ),
      totalCashReceipt: Number(prevSummaryData.totalCashReceipt),
      totalBankReceipt: Number(prevSummaryData.totalBankReceipt),
      totalPendingAmount: Number(prevSummaryData.totalPendingAmount)
    } : calcMonthTotals(allBookings, prevYear, prevMonth),
    [prevSummaryData, allBookings, prevYear, prevMonth]
  );
  const ytd = reactExports.useMemo(
    () => calcYtd(allBookings, year, month),
    [allBookings, year, month]
  );
  const currentValues = summary ? {
    totalBookings: Number(summary.totalBookings),
    totalRentAmount: Number(summary.totalRentAmount),
    totalAdvanceReceived: Number(summary.totalAdvanceReceived),
    totalDiscount: Number(summary.totalDiscount),
    totalSettlementAmount: Number(summary.totalSettlementAmount),
    totalCashReceipt: Number(summary.totalCashReceipt),
    totalBankReceipt: Number(summary.totalBankReceipt),
    totalPendingAmount: Number(summary.totalPendingAmount)
  } : null;
  const hasSummaryData = !!currentValues && currentValues.totalBookings > 0;
  const summaryRows = [
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
      highlight: true
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", "data-ocid": "monthly-summary-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-6 w-6 text-primary" }),
          "Monthly Summary"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Financial overview by month with year-to-date totals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-2 self-start",
          onClick: () => exportToExcel(summary, prevCalc, MONTH_NAMES[month - 1], year),
          disabled: isLoading || !hasSummaryData,
          "data-ocid": "export-excel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            "Export to Excel"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Period:" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "month-select",
            className: "text-sm text-muted-foreground sr-only",
            children: "Month"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "month-select",
            value: month,
            onChange: (e) => setMonth(Number(e.target.value)),
            className: "h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground",
            "data-ocid": "month-select",
            children: MONTH_NAMES.map((name, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i + 1, children: name }, name))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "year-select",
            className: "text-sm text-muted-foreground sr-only",
            children: "Year"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            id: "year-select",
            value: year,
            onChange: (e) => setYear(Number(e.target.value)),
            className: "h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground",
            "data-ocid": "year-select",
            children: YEAR_OPTIONS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto", children: [
        MONTH_SHORT[month - 1],
        " ",
        year
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground", children: [
          MONTH_NAMES[month - 1],
          " ",
          year,
          " — Summary"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "vs. ",
          MONTH_NAMES[prevMonth - 1],
          " ",
          prevYear
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Metric" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider", children: [
            MONTH_SHORT[month - 1],
            " ",
            year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "vs Prev Month" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading || isPrevLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, { count: 8 }) : !hasSummaryData ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 3,
            className: "py-12 text-center text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium", children: [
                "No bookings for ",
                MONTH_NAMES[month - 1],
                " ",
                year
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add bookings with function dates in this month to see summary" })
            ]
          }
        ) }) : summaryRows.map((row) => {
          const val = currentValues ? currentValues[row.key] : 0;
          const prev = prevCalc[row.key];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryTableRow,
            {
              label: row.label,
              value: val,
              prev,
              highlight: row.highlight,
              isCurrency: row.isCurrency !== false
            },
            row.key
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground", children: [
          "Year-to-Date — ",
          year
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Cumulative totals from Jan ",
          year,
          " through ",
          MONTH_NAMES[month - 1],
          " ",
          year
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Metric" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "YTD Total" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isBookingsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: SKELETON_ROW_IDS.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pl-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 ml-auto" }) })
        ] }, id)) }) : ytd.totalBookings === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "td",
          {
            colSpan: 2,
            className: "py-8 text-center text-muted-foreground text-sm",
            children: [
              "No data available for ",
              year
            ]
          }
        ) }) : summaryRows.map((row) => {
          const val = ytd[row.key];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SummaryTableRow,
            {
              label: row.label,
              value: val,
              highlight: row.highlight,
              isCurrency: row.isCurrency !== false
            },
            row.key
          );
        }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-5 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-semibold text-foreground", children: [
          "Monthly Breakdown — ",
          year
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Bookings and pending amount per month" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-0 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pl-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Month" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Rent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Cash" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2.5 pr-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Pending" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isBookingsLoading ? MONTH_NAMES.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pl-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) })
        ] }, name)) : MONTH_NAMES.map((name, i) => {
          const m = i + 1;
          const totals = calcMonthTotals(allBookings, year, m);
          const isCurrentMonth = m === month;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-border last:border-0 cursor-pointer transition-colors ${isCurrentMonth ? "bg-primary/8 font-medium" : "hover:bg-muted/30"}`,
              onClick: () => setMonth(m),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") setMonth(m);
              },
              tabIndex: 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 pl-4 text-sm text-foreground flex items-center gap-2", children: [
                  MONTH_SHORT[i],
                  isCurrentMonth && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: "text-xs py-0 px-1.5 h-4",
                      children: "selected"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-right font-mono text-sm text-foreground", children: totals.totalBookings }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-right font-mono text-sm text-foreground hidden sm:table-cell", children: totals.totalBookings > 0 ? formatCurrency(totals.totalRentAmount) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-right font-mono text-sm text-foreground hidden sm:table-cell", children: totals.totalBookings > 0 ? formatCurrency(totals.totalCashReceipt) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: `py-2.5 pr-4 text-right font-mono text-sm ${totals.totalPendingAmount > 0 ? "text-destructive font-semibold" : "text-muted-foreground"}`,
                    children: totals.totalBookings > 0 ? formatCurrency(totals.totalPendingAmount) : "—"
                  }
                )
              ]
            },
            name
          );
        }) })
      ] }) })
    ] })
  ] });
}
export {
  MonthlySummaryPage as default
};
