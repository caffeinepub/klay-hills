import type { backendInterface, Booking, DashboardStats, MonthlySummary } from "../backend";
import { Hall, TimeOfDay } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const dayMs = BigInt(86400000) * BigInt(1_000_000);

const sampleBookings: Booking[] = [
  {
    id: BigInt(1),
    customerName: "Ravi Kumar",
    bookingDate: now - dayMs * BigInt(5),
    functionDate: now + dayMs * BigInt(10),
    timeOfDay: TimeOfDay.day,
    hall: Hall.tileFactory,
    rentAmount: BigInt(50000),
    advanceReceived: BigInt(20000),
    discount: BigInt(2000),
    settlementAmount: BigInt(5000),
    totalCashReceipt: BigInt(15000),
    totalBankReceipt: BigInt(10000),
    balanceReceivable: BigInt(23000),
    remarks: "Wedding reception",
    createdAt: now - dayMs * BigInt(5),
    updatedAt: now - dayMs * BigInt(5),
  },
  {
    id: BigInt(2),
    customerName: "Priya Sharma",
    bookingDate: now - dayMs * BigInt(3),
    functionDate: now + dayMs * BigInt(7),
    timeOfDay: TimeOfDay.evening,
    hall: Hall.frenchHall,
    rentAmount: BigInt(40000),
    advanceReceived: BigInt(40000),
    discount: BigInt(0),
    settlementAmount: BigInt(0),
    totalCashReceipt: BigInt(20000),
    totalBankReceipt: BigInt(20000),
    balanceReceivable: BigInt(0),
    remarks: "Birthday party",
    createdAt: now - dayMs * BigInt(3),
    updatedAt: now - dayMs * BigInt(3),
  },
  {
    id: BigInt(3),
    customerName: "Arun Nair",
    bookingDate: now - dayMs * BigInt(10),
    functionDate: now + dayMs * BigInt(15),
    timeOfDay: TimeOfDay.day,
    hall: Hall.businessHall,
    rentAmount: BigInt(75000),
    advanceReceived: BigInt(30000),
    discount: BigInt(5000),
    settlementAmount: BigInt(10000),
    totalCashReceipt: BigInt(25000),
    totalBankReceipt: BigInt(15000),
    balanceReceivable: BigInt(30000),
    remarks: "Corporate event",
    createdAt: now - dayMs * BigInt(10),
    updatedAt: now - dayMs * BigInt(10),
  },
];

const dashboardStats: DashboardStats = {
  totalPendingAmount: BigInt(53000),
  pendingBookingsCount: BigInt(2),
  totalBookings: BigInt(3),
  totalCashReceipt: BigInt(60000),
  totalBankReceipt: BigInt(45000),
};

const monthlySummary: MonthlySummary = {
  month: BigInt(new Date().getMonth() + 1),
  year: BigInt(new Date().getFullYear()),
  totalBookings: BigInt(3),
  totalRentAmount: BigInt(165000),
  totalAdvanceReceived: BigInt(90000),
  totalDiscount: BigInt(7000),
  totalSettlementAmount: BigInt(15000),
  totalCashReceipt: BigInt(60000),
  totalBankReceipt: BigInt(45000),
  totalPendingAmount: BigInt(53000),
};

export const mockBackend: backendInterface = {
  createBooking: async (input) => ({
    id: BigInt(4),
    ...input,
    balanceReceivable:
      input.rentAmount -
      input.advanceReceived -
      input.discount -
      input.settlementAmount,
    createdAt: now,
    updatedAt: now,
  }),
  deleteBooking: async () => true,
  getAllBookings: async () => sampleBookings,
  getBooking: async (id) =>
    sampleBookings.find((b) => b.id === id) ?? null,
  getBookingsByCustomer: async (name) =>
    sampleBookings.filter((b) =>
      b.customerName.toLowerCase().includes(name.toLowerCase())
    ),
  getBookingsByDateRange: async (startDate, endDate) =>
    sampleBookings.filter(
      (b) => b.functionDate >= startDate && b.functionDate <= endDate
    ),
  getDashboardStats: async () => dashboardStats,
  getMonthlySummary: async () => monthlySummary,
  getPendingBookings: async () =>
    sampleBookings.filter((b) => b.balanceReceivable > BigInt(0)),
  updateBooking: async () => true,
  verifyAdmin: async () => true,
  updateAdminCredentials: async () => true,
};
