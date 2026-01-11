
import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    fetch("https://t-shirts-2.onrender.com/api/cart/USER123")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  const updateQty = async (cartId, action) => {
    const res = await fetch(
      `https://t-shirts-2.onrender.com/api/cart/update/${cartId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      }
    );

    const data = await res.json();

    if (data.removed) {
      setCart(prev => prev.filter(item => item._id !== cartId));
    } else {
      setCart(prev =>
        prev.map(item => (item._id === cartId ? data : item))
      );
    }
  };
   const localBackground="https://t-shirts-2.onrender.com/api/payment"

 const handlebuy=async()=>{
    const {data} =await axios.post(`${localBackground}/orders`,{amount:totalAmount})
    initPayment(data);
 }
 const initPayment=(orderdata)=>{
  console.log(orderdata);
  const options={
  key:import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount:orderdata.data.amount,
  currency:orderdata.data.currency,
  description:"T SHRITS",
  order_id:orderdata.data.id,
  handler:async(res)=>{
    await axios.post(`${localBackground}/verify`,res).then(function(res){
      if(res.status===200){
        alert("Payment Verified.....")
        navigate("/")
      }
      else{
        alert("Payment Failed....")
      }
    })


  },
  theme:{
    colour:"#3399cc"

  }
  }

  const razorpay_popup =new window.Razorpay(options);
  razorpay_popup.open();
 }


 const totalAmount = cart.reduce((sum, item) => {
  if (!item.productId) return sum;
  return sum + item.productId.price * item.quantity;
}, 0);



  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map(item => {
  if (!item.productId) return null;

  return (
    <div key={item._id} className="flex gap-4 items-center mb-6">
      <img
        src={`https://t-shirts-2.onrender.com${item.productId.image}`}
        alt={item.productId.title}
        className="w-24"
      />

      <div>
        <p>{item.productId.title}</p>
        <p>$ {item.productId.price}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQty(item._id, "dec")}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            −
          </button>

          <span className="font-semibold">{item.quantity}</span>

          <button
            onClick={() => updateQty(item._id, "inc")}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
})}

      <div>
        <h1>Totals:${totalAmount}</h1>
        <button onClick={handlebuy} className="bg-black text-white px-5 rounded p-3 cursor-pointer">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
