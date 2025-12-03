import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  description: String,
  image: String,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model("Product", ProductSchema)
