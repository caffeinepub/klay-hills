import { g as useNavigate, j as jsxRuntimeExports, B as Button, A as ArrowLeft, u as ue } from "./index-kAbpSd27.js";
import { B as BookingForm } from "./BookingForm-BV_S7ps4.js";
import { c as useCreateBooking } from "./backend-client-bywimUWC.js";
import "./card-BbQoiGbn.js";
function NewBookingPage() {
  const navigate = useNavigate();
  const createMutation = useCreateBooking();
  const handleSubmit = async (input) => {
    try {
      await createMutation.mutateAsync(input);
      ue.success("Booking created successfully");
      navigate({ to: "/bookings" });
    } catch {
      ue.error("Failed to create booking");
    }
  };
  const handleCancel = () => {
    navigate({ to: "/bookings" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl", "data-ocid": "new-booking-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/bookings" }),
          className: "shrink-0",
          "aria-label": "Back to bookings",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "New Booking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Create a new convention centre booking" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingForm,
      {
        onSubmit: handleSubmit,
        onCancel: handleCancel,
        isLoading: createMutation.isPending,
        submitLabel: "Create Booking"
      }
    )
  ] });
}
export {
  NewBookingPage as default
};
