import { v4 as uuidv4 } from "uuid";

import bookingModel from "../model/booking.js";
import clientModel from "../model/client.js";
import offerModel from "../model/offer.js";
import {
  addBookingToOfferList,
  updateBookingInOfferList,
  deleteBookingFromOfferList,
} from "../utils/offerlist.js";

const CREATE_BOOKING = async (req, res) => {
  const client = await clientModel.findOne({ id: req.body.clientId });

  const offer = await offerModel.findOne({ _id: req.body.offer });

  const newBooking = {
    id: uuidv4(),
    client: client._id,
    offer: offer._id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    price: offer.price,
    status: "created",
  };
  const booking = new bookingModel(newBooking);
  try {
    const offerListUpdate = await addBookingToOfferList(booking);
    if (offerListUpdate !== "Success") {
      throw new Error(offerListUpdate);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
  try {
    const response = await booking.save();
    return res.status(201).json({
      response: "Booking was created successfully",
      booking: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ALL_BOOKING = async (req, res) => {
  const client = await clientModel.findOne({ id: req.body.clientId });
  console.log(client);
  try {
    const bookings = await bookingModel.find({
      client: client._id,
      status: { $ne: "deleted" },
    });
    return res.status(200).json({ responce: "Ok", bookings: bookings });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_BOOKING_BY_ID = async (req, res) => {
  const client = await clientModel.findOne({ id: req.body.clientId });
  const booking = await bookingModel.findOne({ id: req.params.id });
  try {
    if (!booking.client.equals(client._id)) {
      return res.status(403).json({ responce: "Forbidden" });
    }

    return res.status(200).json({ responce: "Ok", booking: booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const UPDATE_BOOKING_BY_ID = async (req, res) => {
  const client = await clientModel.findOne({ id: req.body.clientId });
  const booking = await bookingModel.findOne({ id: req.params.id });

  try {
    if (!booking.client.equals(client._id)) {
      return res.status(403).json({ responce: "Forbidden" });
    }
    if (!!req.body.startDate) {
      booking.startDate = req.body.startDate;
      booking.status = "created";
    }
    if (!!req.body.endDate) {
      booking.endDate = req.body.endDate;
      booking.status = "created";
    }
    console.log(booking);
    try {
      const offerListUpdate = await updateBookingInOfferList(booking);
      if (offerListUpdate !== "Success") {
        throw new Error(offerListUpdate);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "we have some problems" });
    }
    const response = await bookingModel.findOneAndUpdate(
      { id: req.params.id },
      booking,
      { new: true }
    );

    return res.status(200).json({ responce: "Ok", booking: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};
const DELETE_BOOKING_BY_ID = async (req, res) => {
  const client = await clientModel.findOne({ id: req.body.clientId });
  const booking = await bookingModel.findOne({ id: req.params.id });

  if (!booking.client.equals(client._id)) {
    return res.status(403).json({ responce: "Forbidden" });
  }
  try {
    const offerListUpdate = await deleteBookingFromOfferList(booking);
    if (offerListUpdate !== "Success") {
      throw new Error(offerListUpdate);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
  try {
    booking.status = "deleted";
    console.log(booking);
    const response = await bookingModel.findOneAndUpdate(
      { id: req.params.id },
      booking,
      { new: true }
    );
    console.log(response);
    return res.status(200).json({ responce: "Ok", booking: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export {
  CREATE_BOOKING,
  GET_ALL_BOOKING,
  GET_BOOKING_BY_ID,
  UPDATE_BOOKING_BY_ID,
  DELETE_BOOKING_BY_ID,
};
