const express=require("express")
const cors= require("cors")
const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config();
const mongoose=require('mongoose')
const { db, auth } = require("./config/firebase.config");
const path = require("path");
const Razorpay = require("razorpay")
const crypto = require("crypto")
// import dotenv from "dotenv";
// dotenv.config();


app.get("/firebase-check", (req, res) => {
  db.collection("test")
    .then(() => {
      res.send("✅ Firebase connected successfully");
    })
    .catch((error) => {
      res.send("❌ Firebase NOT connected : " + error.message);
    });
    

});

mongoose.connect(process.env.DB_URL).then(function(){
    console.log("DB was connected")
}).catch(function(){
    console.log("DB Failed")
})

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/womens", require("./routes/womensRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));


app.get("/", (req, res) => {
    res.send("App is running")
})
app.post("/api/payment/orders", (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id:process.env.VITE_RAZORPAY_KEY_ID,
            key_secret:process.env.VITE_RAZORPAY_SECRET_KEY_ID
        });

        const option = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString('hex')

        }
        razorpay.orders.create(option, (error, order) => {
            if (error) {
                res.send("Order were Failed")
            }
            else {
                res.json({ data: order })
            }
        })
    } catch (err) {
        res.send(err)
    }
})
app.post("/api/payment/verify", (req,res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

        const expectedsign = crypto.createHmac("sha256",process.env.VITE_RAZORPAY_SECRET_KEY_ID).update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest("hex")
        if (expectedsign === razorpay_signature) {
            return res.status(200).send("Success")
        } else {
            return res.status(400).send("Failed")
        }

    }catch(error){
        console.log(error)
        return res.status(500).send(error)
    }



})





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});