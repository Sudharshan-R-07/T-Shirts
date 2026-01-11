import React from "react"
import img1 from "../assets/Women.jpg"
import img2 from "../assets/T-shirt.jpg"
import img3 from "../assets/mensw.jpg"
const Head = () => {
    return (
        <>
            <div className=" grid grid-cols-4 mt-6 gap-6 m-5 h-[450px]">
                <div className="relative col-span-1">
                    <img className=" hover:scale-105 w-ful h-[450px] hover:opacity-50" src={img1} alt="Women's"></img>
                    <div>
                        <div className="absolute inset-0 bg-gradient-to-t hover:from-yellow-200/40 to-transparent"></div>
                        <h1 className="absolute bottom-3 left-28  text-4xl  text-white ">Womens</h1>
                    </div>
                </div>
                <div className="relative col-span-2">
                    <img className="hover:scale-105 w-full h-[450px]" src={img2}></img>
                    <div>
                        <div className="absolute inset-0 bg-gradient-to-t hover:from-yellow-200/40 to-transparent"></div>
                        <h1 className="absolute bottom-0 left-3/7  text-4xl text-white  ">T-Shirts</h1>
                    </div>
                </div>
                <div className="relative col-span-1">
                    <img className="w-full h-[450px]" src={img3}></img>
                    <div>
                        <div className="absolute inset-0 flex items-end p-6 opacity-0 transition duration-300 group-hover:opacity-100"></div>
                        <div className="absolute inset-0 bg-gradient-to-t hover:from-yellow-200/40 to-transparent">
                            <h1 className="absolute bottom-3  left-28  text-4xl text-white  ">Mens</h1>
                        </div>
                    </div>
                </div>

            </div>

            <div className="absolute top-5/12 left-28 text-4xl font-bold">

            </div>




        </>
    )
}

export default Head