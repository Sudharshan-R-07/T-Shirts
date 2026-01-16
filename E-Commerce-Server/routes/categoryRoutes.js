const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// ADD category
router.post("/add", async (req, res) => {
  try {
    const exists = await Category.findOne({ name: req.body.name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;
