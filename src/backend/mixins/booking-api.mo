import Types "../types/common";
import BookingLib "../lib/booking";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  bookings : List.List<Types.Booking>,
  bookingCounter : { var id : Nat },
) {
  public func createBooking(input : Types.BookingInput) : async Types.Booking {
    let now = Time.now();
    let booking = BookingLib.createBooking(bookings, bookingCounter.id, input, now);
    bookingCounter.id += 1;
    booking;
  };

  public func updateBooking(id : Types.BookingId, input : Types.BookingInput) : async Bool {
    let now = Time.now();
    BookingLib.updateBooking(bookings, id, input, now);
  };

  public func deleteBooking(id : Types.BookingId) : async Bool {
    BookingLib.deleteBooking(bookings, id);
  };

  public query func getBooking(id : Types.BookingId) : async ?Types.Booking {
    BookingLib.getBooking(bookings, id);
  };

  public query func getAllBookings() : async [Types.Booking] {
    BookingLib.getAllBookings(bookings);
  };

  public query func getBookingsByCustomer(name : Text) : async [Types.Booking] {
    BookingLib.getBookingsByCustomer(bookings, name);
  };

  public query func getBookingsByDateRange(startDate : Types.Timestamp, endDate : Types.Timestamp) : async [Types.Booking] {
    BookingLib.getBookingsByDateRange(bookings, startDate, endDate);
  };

  public query func getPendingBookings() : async [Types.Booking] {
    BookingLib.getPendingBookings(bookings);
  };

  public query func getDashboardStats() : async Types.DashboardStats {
    BookingLib.getDashboardStats(bookings);
  };

  public query func getMonthlySummary(year : Nat, month : Nat) : async Types.MonthlySummary {
    BookingLib.getMonthlySummary(bookings, year, month);
  };
};
