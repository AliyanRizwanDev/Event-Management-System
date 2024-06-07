import mongoose from "mongoose";

const DiscountCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  usageLimit: { type: Number, required: true },
  usedCount: { type: Number, default: 0 },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});

const discount = mongoose.model("DiscountCode", DiscountCodeSchema);
export default discount;
