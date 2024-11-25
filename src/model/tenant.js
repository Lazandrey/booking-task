import mongoose from "mongoose";

const tenantSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accommodations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Accommodation" },
  ],
});

export default mongoose.model("Tenant", tenantSchema);
