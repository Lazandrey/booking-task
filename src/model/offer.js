import mongoose from "mongoose";

const offerSchema = mongoose.Schema({
  id: { type: String, required: true },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Offer", offerSchema);
