import mongoose from "mongoose";

const offerListSchema = mongoose.Schema({
  id: { type: String, required: true },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },
  booked: [
    {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    },
  ],
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("OfferList", offerListSchema);
