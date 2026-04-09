import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Booking,
  BookingId,
  BookingInput,
  DashboardStats,
  MonthlySummary,
} from "../types";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export function useAllBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBooking(id: BookingId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking | null>({
    queryKey: ["booking", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getBooking(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function usePendingBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["pendingBookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPendingBookings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookingsByCustomer(name: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["bookings", "customer", name],
    queryFn: async () => {
      if (!actor || !name) return [];
      return actor.getBookingsByCustomer(name);
    },
    enabled: !!actor && !isFetching && name.length > 0,
  });
}

export function useBookingsByDateRange(
  startDate: bigint,
  endDate: bigint,
  enabled: boolean,
) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: [
      "bookings",
      "dateRange",
      startDate.toString(),
      endDate.toString(),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookingsByDateRange(startDate, endDate);
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useCreateBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: BookingInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBooking(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
      qc.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
  });
}

export function useUpdateBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: BookingId; input: BookingInput }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateBooking(id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
      qc.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
  });
}

export function useDeleteBooking() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: BookingId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteBooking(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["dashboardStats"] });
      qc.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
  });
}

// ─── Monthly Summary ──────────────────────────────────────────────────────────

export function useMonthlySummary(year: number, month: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MonthlySummary>({
    queryKey: ["monthlySummary", year, month],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getMonthlySummary(BigInt(year), BigInt(month));
    },
    enabled: !!actor && !isFetching,
  });
}
