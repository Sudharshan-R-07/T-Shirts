const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// ADD TO CART
router.post("/add", async (req, res) => {
  const { userId, productId } = req.body;

  let item = await Cart.findOne({ userId, productId });

  if (item) {
    item.quantity += 1;
    await item.save();

    const populatedItem = await Cart.findById(item._id)
      .populate("productId");

    return res.json(populatedItem);
  }

  const newItem = await Cart.create({ userId, productId });

  const populatedItem = await Cart.findById(newItem._id)
    .populate("productId");

  res.json(populatedItem);
});

// GET CART
router.get("/:userId", async (req, res) => {
  const cart = await Cart.find({ userId: req.params.userId })
    .populate("productId");

  res.json(cart);
});

// UPDATE quantity
router.put("/update/:id", async (req, res) => {
  const { action } = req.body;

  let item = await Cart.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  if (action === "inc") item.quantity += 1;
  if (action === "dec") item.quantity -= 1;

  if (item.quantity <= 0) {
    await Cart.findByIdAndDelete(req.params.id);
    return res.json({ removed: true });
  }

  await item.save();

  // 🔥 THIS IS THE KEY FIX
  const populatedItem = await Cart.findById(item._id).populate("productId");

  res.json(populatedItem);
});

// REMOVE item
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed from cart" });
});

module.exports = router;

