import React from "react";
import { FaInstagram, FaFacebook, FaPinterest, FaYoutube } from "react-icons/fa"
const Footer = () => {
    return (
        <>
            <div className="grid grid-cols-3 border mt-10  justify-center items-center">
                <div className="bg-black text-white  border p-14  text-center col-span-1 ">
                    <h1>T SHOP</h1>
                    <p>info@myside.com</p>
                    <p>Tel:123-456-7890</p>
                </div>
                <div className="flex col-span-2 cursor-pointer items-center justify-center">
                    <div className="p-4">
                        <p className="mb-3">Shop</p>
                        <p className="mb-1">New</p>
                        <p className="mb-1">Women</p>
                        <p className="mb-1">Men</p>
                    </div>
                    <div className="p-5 cursor-pointer">
                        <p className="mb-3">Our Store</p>
                        <p className="mb-1">About Us</p>
                        <p>FAQ</p>
                    </div>
                    <div className="p-5 cursor-pointer">
                        <p className="mb-3">Terms & Conditions</p>
                        <p className="mb-1">Store Policy</p>
                        <p className="mb-1">Shipping & Payment</p>
                        <p className="mb-1">Payment Method</p>
                    </div>
                </div>
                <div className="flex gap-6 justify-center items-center p-5 border col-span-1">
                    <FaInstagram size={40}></FaInstagram>
                    <FaFacebook size={40} />
                    <FaPinterest size={40} />
                    <FaYoutube size={40} />

                </div>
                <div className="p-6 col-span-2 bg-[#D6FF38]  border">
                    <p className="text-2xl text-center"> © 2035 by T Shop. Powered and secured</p>
                </div>

            </div>
        </>
    )
}
export default Footer