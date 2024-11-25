import mongoose from "mongoose";

const accommodationSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  address: {
    apartmentNo: { type: String, required: false },
    houseNo: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },

  area: { type: Number, required: true },
  roomsNo: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  isDeleted: { type: Boolean, required: true },
});

export default mongoose.model("Accommodation", accommodationSchema);
