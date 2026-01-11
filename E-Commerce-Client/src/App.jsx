import React from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from './componets/Navbar'
import Head from './componets/Head'
import Home from './componets/Home'
import Hero from './componets/Hero'
import Footer from './componets/Footer'
import Newdrop from './componets/Newdrop'
import Women from './componets/Women'
import Men from './componets/Men'
import Signup from './Signup'
import Login from './Login'
import Cart from './componets/Cart'
import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
    
    <BrowserRouter>
     <Navbar></Navbar>
     
    <Routes>
      <Route path='/' element={
        <> 
        <Head></Head>
        <Home></Home>
        <Hero/>
        </>  
      }></Route>
      <Route path='/home' element={<>
     <Head/>
      <Home/>
      <Hero></Hero>
      
      </>
        }></Route>
      <Route path='/newdrop' element={<Newdrop/>}></Route>
      <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path='/signup' element={<Signup/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/cart' element={<Cart />} />
    </Routes>
    </BrowserRouter>
     <Footer></Footer>
  </>
  )
}

export default App
