import Types "types/common";
import AuthTypes "types/auth";
import BookingMixin "mixins/booking-api";
import AuthMixin "mixins/auth-api";
import Migration "migration";
import List "mo:core/List";

(with migration = Migration.run)
actor {
  let bookings = List.empty<Types.Booking>();
  let bookingCounter : { var id : Nat } = { var id = 1 };

  let adminCredentials : AuthTypes.AdminCredentials = {
    var username = "KLAYHILLS";
    var passwordHash = "KLAY@123";
  };

  include BookingMixin(bookings, bookingCounter);
  include AuthMixin(adminCredentials);
};
