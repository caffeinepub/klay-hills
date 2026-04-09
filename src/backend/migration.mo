import Types "types/common";
import AuthTypes "types/auth";
import List "mo:core/List";

module {
  // Old types defined inline (from .old/src/backend/types/common.mo)
  type OldTimeOfDay = { #day; #evening };

  type OldBooking = {
    id : Nat;
    customerName : Text;
    bookingDate : Int;
    functionDate : Int;
    timeOfDay : OldTimeOfDay;
    rentAmount : Nat;
    advanceReceived : Nat;
    discount : Nat;
    settlementAmount : Nat;
    totalCashReceipt : Nat;
    totalBankReceipt : Nat;
    remarks : Text;
    balanceReceivable : Int;
    createdAt : Int;
    updatedAt : Int;
  };

  type OldAdminCredentials = {
    var username : Text;
    var passwordHash : Text;
  };

  type OldActor = {
    bookings : List.List<OldBooking>;
    var nextBookingId : Nat;
    adminCredentials : OldAdminCredentials;
  };

  type NewActor = {
    bookings : List.List<Types.Booking>;
    bookingCounter : { var id : Nat };
    adminCredentials : AuthTypes.AdminCredentials;
  };

  public func run(old : OldActor) : NewActor {
    let newBookings = old.bookings.map<OldBooking, Types.Booking>(
      func(b) {
        { b with hall = #others }
      }
    );
    {
      bookings = newBookings;
      bookingCounter = { var id = old.nextBookingId };
      adminCredentials = old.adminCredentials;
    };
  };
};
