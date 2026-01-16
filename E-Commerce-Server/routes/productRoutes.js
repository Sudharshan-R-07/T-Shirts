


// routes/productRoutes.js
const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.post("/add", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product saved", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
