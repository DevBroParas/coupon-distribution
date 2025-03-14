import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: String,
  claimedBy: { type: String, default: null }, // Stores IP
  claimedAt: { type: Date, default: null },
});

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);

export default Coupon;
