module {
  public type BookingId = Nat;
  public type Timestamp = Int;

  public type TimeOfDay = {
    #day;
    #evening;
  };

  public type Hall = {
    #tileFactory;
    #terra;
    #frenchHall;
    #businessHall;
    #others;
  };

  public type Booking = {
    id : BookingId;
    customerName : Text;
    bookingDate : Timestamp;
    functionDate : Timestamp;
    timeOfDay : TimeOfDay;
    hall : Hall;
    rentAmount : Nat;
    advanceReceived : Nat;
    discount : Nat;
    settlementAmount : Nat;
    totalCashReceipt : Nat;
    totalBankReceipt : Nat;
    remarks : Text;
    balanceReceivable : Int;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type BookingInput = {
    customerName : Text;
    bookingDate : Timestamp;
    functionDate : Timestamp;
    timeOfDay : TimeOfDay;
    hall : Hall;
    rentAmount : Nat;
    advanceReceived : Nat;
    discount : Nat;
    settlementAmount : Nat;
    totalCashReceipt : Nat;
    totalBankReceipt : Nat;
    remarks : Text;
  };

  public type DashboardStats = {
    totalCashReceipt : Nat;
    totalBankReceipt : Nat;
    totalPendingAmount : Int;
    totalBookings : Nat;
    pendingBookingsCount : Nat;
  };

  public type MonthlySummary = {
    year : Nat;
    month : Nat;
    totalBookings : Nat;
    totalRentAmount : Nat;
    totalAdvanceReceived : Nat;
    totalDiscount : Nat;
    totalSettlementAmount : Nat;
    totalCashReceipt : Nat;
    totalBankReceipt : Nat;
    totalPendingAmount : Int;
  };
};
