import type {
  Booking,
  BookingId,
  BookingInput,
  DashboardStats,
  Hall,
  MonthlySummary,
  TimeOfDay,
  Timestamp,
} from "../backend";

export type {
  Booking,
  BookingInput,
  BookingId,
  Timestamp,
  TimeOfDay,
  Hall,
  DashboardStats,
  MonthlySummary,
};

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export type ExportFormat = "excel" | "pdf";
