import { c as createLucideIcon, j as jsxRuntimeExports, l as cn, r as reactExports, q as createSlot, f as formatCurrency, s as formatDateInput, d as calcBalanceReceivable, B as Button, v as dateToTimestamp } from "./index-kAbpSd27.js";
import { C as Card, c as CardContent } from "./card-BbQoiGbn.js";
import { H as Hall, T as TimeOfDay } from "./backend-client-bywimUWC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
];
const Moon = createLucideIcon("moon", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function PendingBadge({ amount, className = "" }) {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  if (num <= 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `font-mono text-sm font-semibold text-accent ${className}`,
        children: formatCurrency(0)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `balance-highlight font-mono text-sm ${className}`,
      "data-ocid": "pending-badge",
      children: formatCurrency(num)
    }
  );
}
function toNum(v) {
  const n = Number.parseInt(v.replace(/[^0-9]/g, ""), 10);
  return BigInt(Number.isNaN(n) ? 0 : n);
}
const HALL_OPTIONS = [
  { value: Hall.tileFactory, label: "Tile Factory" },
  { value: Hall.terra, label: "Terra" },
  { value: Hall.frenchHall, label: "French Hall" },
  { value: Hall.businessHall, label: "Business Hall" },
  { value: Hall.others, label: "Others" }
];
function hallLabel(hall) {
  var _a;
  return ((_a = HALL_OPTIONS.find((o) => o.value === hall)) == null ? void 0 : _a.label) ?? hall;
}
function BookingForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel
}) {
  const [customerName, setCustomerName] = reactExports.useState(
    (initialData == null ? void 0 : initialData.customerName) ?? ""
  );
  const [bookingDate, setBookingDate] = reactExports.useState(
    initialData ? formatDateInput(initialData.bookingDate) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
  );
  const [functionDate, setFunctionDate] = reactExports.useState(
    initialData ? formatDateInput(initialData.functionDate) : ""
  );
  const [timeOfDay, setTimeOfDay] = reactExports.useState(
    (initialData == null ? void 0 : initialData.timeOfDay) ?? TimeOfDay.day
  );
  const [hall, setHall] = reactExports.useState((initialData == null ? void 0 : initialData.hall) ?? Hall.tileFactory);
  const [rentAmount, setRentAmount] = reactExports.useState(
    String(initialData ? Number(initialData.rentAmount) : "")
  );
  const [advanceReceived, setAdvanceReceived] = reactExports.useState(
    String(initialData ? Number(initialData.advanceReceived) : "")
  );
  const [discount, setDiscount] = reactExports.useState(
    String(initialData ? Number(initialData.discount) : "")
  );
  const [settlementAmount, setSettlementAmount] = reactExports.useState(
    String(initialData ? Number(initialData.settlementAmount) : "")
  );
  const [totalCashReceipt, setTotalCashReceipt] = reactExports.useState(
    String(initialData ? Number(initialData.totalCashReceipt) : "")
  );
  const [totalBankReceipt, setTotalBankReceipt] = reactExports.useState(
    String(initialData ? Number(initialData.totalBankReceipt) : "")
  );
  const [remarks, setRemarks] = reactExports.useState((initialData == null ? void 0 : initialData.remarks) ?? "");
  const balance = calcBalanceReceivable(
    toNum(rentAmount),
    toNum(advanceReceived),
    toNum(discount),
    toNum(settlementAmount)
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !bookingDate || !functionDate) return;
    const input = {
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
      remarks: remarks.trim()
    };
    await onSubmit(input);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-4",
      "data-ocid": "booking-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Customer & Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "customerName", children: [
                "Customer Name ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customerName",
                  value: customerName,
                  onChange: (e) => setCustomerName(e.target.value),
                  placeholder: "Enter customer name",
                  required: true,
                  "data-ocid": "booking-customer-name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "bookingDate", children: [
                "Booking Date ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bookingDate",
                  type: "date",
                  value: bookingDate,
                  onChange: (e) => setBookingDate(e.target.value),
                  required: true,
                  "data-ocid": "booking-date"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "functionDate", children: [
                "Function Date ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "functionDate",
                  type: "date",
                  value: functionDate,
                  onChange: (e) => setFunctionDate(e.target.value),
                  required: true,
                  "data-ocid": "booking-function-date"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
              "Time of Day ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border rounded-md overflow-hidden w-fit", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setTimeOfDay(TimeOfDay.day),
                  className: `px-5 py-2.5 text-sm font-medium flex items-center gap-2 transition-smooth ${timeOfDay === TimeOfDay.day ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
                  "data-ocid": "toggle-day",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4" }),
                    " Day"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setTimeOfDay(TimeOfDay.evening),
                  className: `px-5 py-2.5 text-sm font-medium flex items-center gap-2 border-l border-border transition-smooth ${timeOfDay === TimeOfDay.evening ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`,
                  "data-ocid": "toggle-evening",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4" }),
                    " Evening"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "hall", children: [
              "Hall ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "hall",
                value: hall,
                onChange: (e) => setHall(e.target.value),
                className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                "data-ocid": "booking-hall",
                children: HALL_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm uppercase tracking-wide text-muted-foreground", children: "Financial Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "rentAmount", children: [
                "Rent Amount (₹) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "rentAmount",
                  type: "number",
                  min: "0",
                  value: rentAmount,
                  onChange: (e) => setRentAmount(e.target.value),
                  placeholder: "0",
                  "data-ocid": "booking-rent"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "advanceReceived", children: "Advance Received (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "advanceReceived",
                  type: "number",
                  min: "0",
                  value: advanceReceived,
                  onChange: (e) => setAdvanceReceived(e.target.value),
                  placeholder: "0",
                  "data-ocid": "booking-advance"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "discount", children: "Discount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "discount",
                  type: "number",
                  min: "0",
                  value: discount,
                  onChange: (e) => setDiscount(e.target.value),
                  placeholder: "0",
                  "data-ocid": "booking-discount"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "settlementAmount", children: "Settlement Amount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "settlementAmount",
                  type: "number",
                  min: "0",
                  value: settlementAmount,
                  onChange: (e) => setSettlementAmount(e.target.value),
                  placeholder: "0",
                  "data-ocid": "booking-settlement"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "totalCashReceipt", children: "Total Cash Receipt (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "totalCashReceipt",
                  type: "number",
                  min: "0",
                  value: totalCashReceipt,
                  onChange: (e) => setTotalCashReceipt(e.target.value),
                  placeholder: "0",
                  "data-ocid": "booking-cash"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "totalBankReceipt", children: "Total Bank Receipt (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "totalBankReceipt",
                  type: "number",
                  min: "0",
                  value: totalBankReceipt,
                  onChange: (e) => setTotalBankReceipt(e.target.value),
                  placeholder: "0",
                  "data-ocid": "booking-bank"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex items-center justify-between p-3 rounded-lg border ${balance > 0 ? "border-destructive/30 bg-destructive/5" : "border-border bg-muted/30"}`,
              "data-ocid": "balance-summary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Balance Receivable" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Rent − Advance − Discount − Settlement" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PendingBadge, { amount: balance, className: "text-base" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "remarks", children: "Remarks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "remarks",
                value: remarks,
                onChange: (e) => setRemarks(e.target.value),
                placeholder: "Optional notes about this booking…",
                rows: 3,
                "data-ocid": "booking-remarks"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isLoading || !customerName || !bookingDate || !functionDate,
              "data-ocid": "booking-submit",
              children: isLoading ? "Saving…" : submitLabel
            }
          ),
          onCancel && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: onCancel,
              "data-ocid": "booking-cancel",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs ml-auto", children: [
            "Balance = ",
            formatCurrency(balance)
          ] })
        ] })
      ]
    }
  );
}
export {
  BookingForm as B,
  HALL_OPTIONS as H,
  Input as I,
  Label as L,
  Moon as M,
  PendingBadge as P,
  Sun as S,
  Primitive as a,
  hallLabel as h
};
