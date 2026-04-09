import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type BookingId = bigint;
export type Timestamp = bigint;
export interface BookingInput {
    customerName: string;
    functionDate: Timestamp;
    settlementAmount: bigint;
    advanceReceived: bigint;
    hall: Hall;
    rentAmount: bigint;
    bookingDate: Timestamp;
    discount: bigint;
    totalCashReceipt: bigint;
    totalBankReceipt: bigint;
    timeOfDay: TimeOfDay;
    remarks: string;
}
export interface Booking {
    id: BookingId;
    customerName: string;
    functionDate: Timestamp;
    settlementAmount: bigint;
    advanceReceived: bigint;
    hall: Hall;
    createdAt: Timestamp;
    rentAmount: bigint;
    updatedAt: Timestamp;
    bookingDate: Timestamp;
    discount: bigint;
    totalCashReceipt: bigint;
    totalBankReceipt: bigint;
    timeOfDay: TimeOfDay;
    remarks: string;
    balanceReceivable: bigint;
}
export interface MonthlySummary {
    totalPendingAmount: bigint;
    month: bigint;
    totalRentAmount: bigint;
    totalAdvanceReceived: bigint;
    year: bigint;
    totalBookings: bigint;
    totalSettlementAmount: bigint;
    totalCashReceipt: bigint;
    totalBankReceipt: bigint;
    totalDiscount: bigint;
}
export interface DashboardStats {
    totalPendingAmount: bigint;
    pendingBookingsCount: bigint;
    totalBookings: bigint;
    totalCashReceipt: bigint;
    totalBankReceipt: bigint;
}
export enum Hall {
    terra = "terra",
    tileFactory = "tileFactory",
    businessHall = "businessHall",
    others = "others",
    frenchHall = "frenchHall"
}
export enum TimeOfDay {
    day = "day",
    evening = "evening"
}
export interface backendInterface {
    createBooking(input: BookingInput): Promise<Booking>;
    deleteBooking(id: BookingId): Promise<boolean>;
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(id: BookingId): Promise<Booking | null>;
    getBookingsByCustomer(name: string): Promise<Array<Booking>>;
    getBookingsByDateRange(startDate: Timestamp, endDate: Timestamp): Promise<Array<Booking>>;
    getDashboardStats(): Promise<DashboardStats>;
    getMonthlySummary(year: bigint, month: bigint): Promise<MonthlySummary>;
    getPendingBookings(): Promise<Array<Booking>>;
    updateAdminCredentials(currentPassword: string, newUsername: string, newPassword: string): Promise<boolean>;
    updateBooking(id: BookingId, input: BookingInput): Promise<boolean>;
    verifyAdmin(username: string, password: string): Promise<boolean>;
}
