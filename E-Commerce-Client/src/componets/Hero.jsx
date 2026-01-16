import React, { useEffect, useState, useRef } from "react"
import { FaArrowRight, FaAngleLeft, FaArrowLeft } from "react-icons/fa"
import img from "../assets/heroi.jpg"
const Hero = () => {
    const [show, setShow] = useState(false)
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setShow(true);
            },
            { threshold: 0.3 }
        );

        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return (
        <>
            <div ref={ref} className={`relative  bg-white shadow-2xl m-20 rounded-2xl ${show ? "animate-fade-up" : "opacity-0"}`}>
                <img src={img} className="h-162.5 mt-5 p-5"></img>
                <div className={`text-center absolute top-1/2 right-1/6 `}>
                    <p className="font-bold ">Sales On!</p>
                    <h1 className="text-6xl font-bold">25% OFF</h1>
                    <p className="font-bold">25% off sitewide using TEES25 at checkout</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/60 to-transparent"></div>
            </div>
            <div className={""}>
                <h1 className="font-bold  text-4xl text-center underline">GET 10% OFF YOUR FIRST ORDER!</h1>
            </div>

        </>
    )
}

export default Hero