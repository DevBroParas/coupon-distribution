import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  cookieId: { type: String, required: true },
  claimedAt: { type: Date, required: true },
});

const Claim = mongoose.models.Claim || mongoose.model("Claim", ClaimSchema);

export default Claim;
