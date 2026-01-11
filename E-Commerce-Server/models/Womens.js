// models/Product.js


const mongoose = require("mongoose");

const womensSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  Category: { type: String },
  isBestseller: { type: Boolean, default: false }
});

module.exports = mongoose.model("Womens", womensSchema);