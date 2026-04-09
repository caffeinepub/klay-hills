import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";

// Lazy page imports
import NotFoundPage from "./pages/NotFoundPage";

import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy } from "react";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));
const NewBookingPage = lazy(() => import("./pages/NewBookingPage"));
const BookingDetailPage = lazy(() => import("./pages/BookingDetailPage"));
const EditBookingPage = lazy(() => import("./pages/EditBookingPage"));
const PendingReportPage = lazy(() => import("./pages/PendingReportPage"));
const MonthlySummaryPage = lazy(() => import("./pages/MonthlySummaryPage"));
const ImportExportPage = lazy(() => import("./pages/ImportExportPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function PageLoader() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

function AppLayout() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: AppLayout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/",
  component: () => <DashboardPage />,
});

const bookingsRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/bookings",
  component: () => <BookingsPage />,
});

const newBookingRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/bookings/new",
  component: () => <NewBookingPage />,
});

const bookingDetailRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/bookings/$id",
  component: () => <BookingDetailPage />,
});

const editBookingRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/bookings/$id/edit",
  component: () => <EditBookingPage />,
});

const pendingReportRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/pending-report",
  component: () => <PendingReportPage />,
});

const monthlySummaryRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/monthly-summary",
  component: () => <MonthlySummaryPage />,
});

const importExportRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/import-export",
  component: () => <ImportExportPage />,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/settings",
  component: () => <SettingsPage />,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  appLayout.addChildren([
    dashboardRoute,
    bookingsRoute,
    newBookingRoute,
    bookingDetailRoute,
    editBookingRoute,
    pendingReportRoute,
    monthlySummaryRoute,
    importExportRoute,
    settingsRoute,
  ]),
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
