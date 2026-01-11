import React, { use, useEffect, useState } from "react"
import auth from '../../config/firebase'
import { signOut } from 'firebase/auth'

import { FaIcons, FaUser, FaShoppingBag, } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import Cart from "./Cart"


const Navbar = () => {
  ({ cart }) => {
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );}
  const navigate = useNavigate()
  const [log, setlog] = useState(false)
  const [cart,setcart]=useState()
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("User Logged in")
        setlog(true)
      }
      else {
        console.log("User Logged Out")
        setlog(false)
      }
    })
  }, [])
  function logout() {
    signOut(auth)
    alert("Logout Sucessfully")

  }




  return (
    <>
      <div className="block">
        <p className="bg-black p-2 text-white text-center">Sale is on! 25% off sitewide using TEES25 at checkout</p>
      </div>
      <div className="border justify-between flex  items-center h-100%">
        <h1 className="bg-[#D6FF38] inline-block border  p-6 text-2xl font-bold">T SHOP</h1>
        <Link to="/home" className=" border-r-2 p-7  hover:bg-black hover:text-white">Home</Link>
        <Link to="/newdrop" className=" border-r-2 p-7  hover:bg-black hover:text-white">New</Link>

        <Link to="/women" className="border-r-2 p-7  hover:bg-black hover:text-white">Women</Link>
        <Link to="/men" className="border-r-2 p-7  hover:bg-black hover:text-white">Men</Link>
        <div className="flex items-center cursor-pointer gap-4 p-6">
          <FaUser></FaUser>
          {
            log ? <button className='button-style hidden md:block' onClick={logout}>Log Out</button> : <button className='button-style hidden md:block' onClick={() => navigate("/login")}>Login</button>
          }
          <div className="relative">
            <FaShoppingBag  className="cursor-pointer"
  onClick={() => navigate("/cart")} size={35}></FaShoppingBag>
            <div className="absolute top-3 left-3 ">
              <h1 className="text-white "></h1>
            </div>
          </div>


        </div>


      </div>
      <div className="text-center">
        <h1 className="text-8xl font-bold text-center mt-8">T SHOP</h1>
        <p className=" bg-[#D6FF38] px-20 text-xl mt-2 inline-block items-center transition-transform duration-500 ease-out">There's for Everyone</p>
      </div>

    </>
  )
}

export default Navbar