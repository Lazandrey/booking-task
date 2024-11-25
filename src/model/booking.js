import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  id: { type: String, required: true },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
});

export default mongoose.model("Booking", bookingSchema);
