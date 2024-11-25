import offerListModel from "../model/offerlist.js";

const addBookingToOfferList = async (booking) => {
  const offerList = await offerListModel
    .findOne({ offer: booking.offer })
    .populate("offer");
  if (!offerList) {
    return "Error, Offer not found";
  }
  if (offerList.isDeleted) {
    return "Error, Offer is deleted";
  }
  if (!offerList.isAvailable) {
    return "Error, Offer is not available";
  }

  if (
    booking.startDate.getTime() < offerList.offer.startDate.getTime() ||
    booking.endDate.getTime() > offerList.offer.endDate.getTime()
  ) {
    return "Error, incorrect dates";
  }
  if (offerList.booked.length > 0) {
    for (let i = 0; i < offerList.booked.length; i++) {
      if (
        booking.startDate.getTime() >=
          offerList.booked[i].startDate.getTime() &&
        booking.startDate.getTime() <= offerList.booked[i].endDate.getTime() &&
        booking.endDate.getTime() >= offerList.booked[i].startDate.getTime() &&
        booking.endDate.getTime() <= offerList.booked[i].endDate.getTime()
      ) {
        return "Error, incorrect dates";
      }
    }
  }
  offerList.booked.push({
    startDate: booking.startDate,
    endDate: booking.endDate,
    booking: booking._id,
  });
  offerList.booked.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
  const bookedDays = offerList.booked.reduce((acc, item) => {
    return acc + item.endDate.getTime() - item.startDate.getTime();
  }, 0);

  if (
    bookedDays ===
    offerList.offer.endDate.getTime() - offerList.offer.startDate.getTime()
  ) {
    offerList.isAvailable = false;
  }
  await offerList.save();
  return "Success";
};

const updateBookingInOfferList = async (booking) => {
  const offerList = await offerListModel
    .findOne({ offer: booking.offer })
    .populate("offer");
  if (!offerList) {
    return "Error, Offer not found";
  }
  if (offerList.isDeleted) {
    return "Error, Offer is deleted";
  }
  if (!offerList.isAvailable) {
    return "Error, Offer is not available";
  }
  if (
    booking.startDate.getTime() < offerList.offer.startDate.getTime() ||
    booking.endDate.getTime() > offerList.offer.endDate.getTime()
  ) {
    return "Error, incorrect dates";
  }
  if (offerList.booked.length == 0) {
    return "Error, booking not found";
  }
  const bookingIndex = offerList.booked.findIndex((item) =>
    item.booking.equals(booking._id)
  );
  if (bookingIndex === -1) {
    return "Error, booking not found";
  }
  offerList.booked.splice(bookingIndex, 1);
  for (let i = 0; i < offerList.booked.length; i++) {
    if (
      booking.startDate.getTime() >= offerList.booked[i].startDate.getTime() &&
      booking.startDate.getTime() <= offerList.booked[i].endDate.getTime() &&
      booking.endDate.getTime() >= offerList.booked[i].startDate.getTime() &&
      booking.endDate.getTime() <= offerList.booked[i].endDate.getTime()
    ) {
      return "Error, incorrect dates";
    }
  }
  offerList.booked.push({
    startDate: booking.startDate,
    endDate: booking.endDate,
    booking: booking._id,
  });
  offerList.booked.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime()
  );
  const bookedDays = offerList.booked.reduce((acc, item) => {
    return acc + item.endDate.getTime() - item.startDate.getTime();
  }, 0);

  if (
    bookedDays ===
    offerList.offer.endDate.getTime() - offerList.offer.startDate.getTime()
  ) {
    offerList.isAvailable = false;
  }
  await offerList.save();
  return "Success";
};
const deleteBookingFromOfferList = async (booking) => {
  const offerList = await offerListModel
    .findOne({ offer: booking.offer })
    .populate("offer");
  if (!offerList) {
    return "Error, Offer not found";
  }
  if (offerList.isDeleted) {
    return "Error, Offer is deleted";
  }
  if (!offerList.isAvailable) {
    return "Error, Offer is not available";
  }
  const bookingIndex = offerList.booked.findIndex((item) =>
    item.booking.equals(booking._id)
  );
  if (bookingIndex === -1) {
    return "Error, booking not found";
  }
  offerList.booked.splice(bookingIndex, 1);
  await offerList.save();
  return "Success";
};

export {
  addBookingToOfferList,
  updateBookingInOfferList,
  deleteBookingFromOfferList,
};
