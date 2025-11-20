import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    contact_number: { type: String, required: true },
    user_name: { type: String, required: true },
    product_name: { type: String, required: true },
    product_review: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
