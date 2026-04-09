import Types "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func calcBalanceReceivable(
    rentAmount : Nat,
    advanceReceived : Nat,
    discount : Nat,
    settlementAmount : Nat,
  ) : Int {
    rentAmount.toInt() - advanceReceived.toInt() - discount.toInt() - settlementAmount.toInt();
  };

  public func createBooking(
    bookings : List.List<Types.Booking>,
    nextId : Nat,
    input : Types.BookingInput,
    now : Types.Timestamp,
  ) : Types.Booking {
    let balance = calcBalanceReceivable(
      input.rentAmount,
      input.advanceReceived,
      input.discount,
      input.settlementAmount,
    );
    let booking : Types.Booking = {
      id = nextId;
      customerName = input.customerName;
      bookingDate = input.bookingDate;
      functionDate = input.functionDate;
      timeOfDay = input.timeOfDay;
      hall = input.hall;
      rentAmount = input.rentAmount;
      advanceReceived = input.advanceReceived;
      discount = input.discount;
      settlementAmount = input.settlementAmount;
      totalCashReceipt = input.totalCashReceipt;
      totalBankReceipt = input.totalBankReceipt;
      remarks = input.remarks;
      balanceReceivable = balance;
      createdAt = now;
      updatedAt = now;
    };
    bookings.add(booking);
    booking;
  };

  public func updateBooking(
    bookings : List.List<Types.Booking>,
    id : Types.BookingId,
    input : Types.BookingInput,
    now : Types.Timestamp,
  ) : Bool {
    let balance = calcBalanceReceivable(
      input.rentAmount,
      input.advanceReceived,
      input.discount,
      input.settlementAmount,
    );
    var found = false;
    bookings.mapInPlace(
      func(b) {
        if (b.id == id) {
          found := true;
          {
            b with
            customerName = input.customerName;
            bookingDate = input.bookingDate;
            functionDate = input.functionDate;
            timeOfDay = input.timeOfDay;
            hall = input.hall;
            rentAmount = input.rentAmount;
            advanceReceived = input.advanceReceived;
            discount = input.discount;
            settlementAmount = input.settlementAmount;
            totalCashReceipt = input.totalCashReceipt;
            totalBankReceipt = input.totalBankReceipt;
            remarks = input.remarks;
            balanceReceivable = balance;
            updatedAt = now;
          };
        } else {
          b;
        };
      }
    );
    found;
  };

  public func deleteBooking(
    bookings : List.List<Types.Booking>,
    id : Types.BookingId,
  ) : Bool {
    let sizeBefore = bookings.size();
    let filtered = bookings.filter(func(b) { b.id != id });
    bookings.clear();
    bookings.append(filtered);
    bookings.size() < sizeBefore;
  };

  public func getBooking(
    bookings : List.List<Types.Booking>,
    id : Types.BookingId,
  ) : ?Types.Booking {
    bookings.find(func(b) { b.id == id });
  };

  public func getAllBookings(
    bookings : List.List<Types.Booking>,
  ) : [Types.Booking] {
    bookings.toArray();
  };

  public func getBookingsByCustomer(
    bookings : List.List<Types.Booking>,
    name : Text,
  ) : [Types.Booking] {
    let lower = name.toLower();
    bookings.filter(func(b) { b.customerName.toLower().contains(#text lower) }).toArray();
  };

  public func getBookingsByDateRange(
    bookings : List.List<Types.Booking>,
    startDate : Types.Timestamp,
    endDate : Types.Timestamp,
  ) : [Types.Booking] {
    bookings.filter(func(b) {
      b.functionDate >= startDate and b.functionDate <= endDate;
    }).toArray();
  };

  public func getPendingBookings(
    bookings : List.List<Types.Booking>,
  ) : [Types.Booking] {
    bookings.filter(func(b) { b.balanceReceivable > 0 }).toArray();
  };

  public func getDashboardStats(
    bookings : List.List<Types.Booking>,
  ) : Types.DashboardStats {
    var totalCash : Nat = 0;
    var totalBank : Nat = 0;
    var totalPending : Int = 0;
    var pendingCount : Nat = 0;
    bookings.forEach(func(b) {
      totalCash += b.totalCashReceipt;
      totalBank += b.totalBankReceipt;
      if (b.balanceReceivable > 0) {
        totalPending += b.balanceReceivable;
        pendingCount += 1;
      };
    });
    {
      totalCashReceipt = totalCash;
      totalBankReceipt = totalBank;
      totalPendingAmount = totalPending;
      totalBookings = bookings.size();
      pendingBookingsCount = pendingCount;
    };
  };

  public func getMonthlySummary(
    bookings : List.List<Types.Booking>,
    year : Nat,
    month : Nat,
  ) : Types.MonthlySummary {
    // Convert nanosecond timestamps to approximate year/month using fixed period lengths
    // 1 second = 1_000_000_000 ns, 1 day = 86_400s, 1 year ≈ 365.25 days
    let nsPerDay : Int = 86_400_000_000_000;
    // Days from epoch (1970-01-01) to start of given year
    let yearsSinceEpoch : Int = year.toInt() - 1970;
    // Approximate leap years
    let leapDays : Int = (yearsSinceEpoch + 1) / 4 - (yearsSinceEpoch + 69) / 100 + (yearsSinceEpoch + 369) / 400;
    let daysToYear : Int = yearsSinceEpoch * 365 + leapDays;
    // Days in each month (non-leap year as base; leap year corrected for Feb)
    let isLeap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0);
    let daysInMonth : [Nat] = if (isLeap) {
      [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    } else {
      [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    };
    var daysToMonth : Int = 0;
    var m = 0;
    while (m < month - 1 and m < 12) {
      daysToMonth += daysInMonth[m].toInt();
      m += 1;
    };
    let monthStart : Int = (daysToYear + daysToMonth) * nsPerDay;
    let monthDays : Int = if (month >= 1 and month <= 12) { daysInMonth[month - 1].toInt() } else { 30 };
    let monthEnd : Int = monthStart + monthDays * nsPerDay;

    var totalBookings : Nat = 0;
    var totalRent : Nat = 0;
    var totalAdvance : Nat = 0;
    var totalDiscount : Nat = 0;
    var totalSettlement : Nat = 0;
    var totalCash : Nat = 0;
    var totalBank : Nat = 0;
    var totalPending : Int = 0;

    bookings.forEach(func(b) {
      if (b.functionDate >= monthStart and b.functionDate < monthEnd) {
        totalBookings += 1;
        totalRent += b.rentAmount;
        totalAdvance += b.advanceReceived;
        totalDiscount += b.discount;
        totalSettlement += b.settlementAmount;
        totalCash += b.totalCashReceipt;
        totalBank += b.totalBankReceipt;
        if (b.balanceReceivable > 0) {
          totalPending += b.balanceReceivable;
        };
      };
    });

    {
      year;
      month;
      totalBookings;
      totalRentAmount = totalRent;
      totalAdvanceReceived = totalAdvance;
      totalDiscount;
      totalSettlementAmount = totalSettlement;
      totalCashReceipt = totalCash;
      totalBankReceipt = totalBank;
      totalPendingAmount = totalPending;
    };
  };
};
