import { h as useParams, g as useNavigate, j as jsxRuntimeExports, S as Skeleton, B as Button, a as Link, A as ArrowLeft, u as ue } from "./index-kAbpSd27.js";
import { B as BookingForm } from "./BookingForm-BV_S7ps4.js";
import { d as useBooking, e as useUpdateBooking } from "./backend-client-bywimUWC.js";
import "./card-BbQoiGbn.js";
function EditBookingPage() {
  const { id } = useParams({ from: "/app/bookings/$id/edit" });
  const bookingId = BigInt(id);
  const { data: booking, isLoading } = useBooking(bookingId);
  const updateMutation = useUpdateBooking();
  const navigate = useNavigate();
  const handleSubmit = async (input) => {
    try {
      await updateMutation.mutateAsync({ id: bookingId, input });
      ue.success("Booking updated successfully");
      navigate({ to: "/bookings/$id", params: { id } });
    } catch {
      ue.error("Failed to update booking");
    }
  };
  const handleCancel = () => {
    navigate({ to: "/bookings/$id", params: { id } });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-4", children: [
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl", "data-ocid": "edit-booking-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: () => navigate({ to: "/bookings/$id", params: { id } }),
          className: "shrink-0",
          "aria-label": "Back to booking detail",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Edit Booking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: booking.customerName })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingForm,
      {
        initialData: booking,
        onSubmit: handleSubmit,
        onCancel: handleCancel,
        isLoading: updateMutation.isPending,
        submitLabel: "Update Booking"
      }
    )
  ] });
}
export {
  EditBookingPage as default
};
