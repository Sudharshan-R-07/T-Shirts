import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Men = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
     useEffect(() => {
    fetch("https://t-shirts-2.onrender.com/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);



    useEffect(() => {
        fetch("https://t-shirts-2.onrender.com/api/categories")
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    if (loading) return <h2>Loading...</h2>;
    const addToCart = async (productId) => {
        await fetch("https://t-shirts-2.onrender.com/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: "USER123",
                productId
            })
        });
        navigate("/cart");
    };


    return (
        <>
            <div>
                <h1 className="text-5xl font-extrabold m-5 p-5">MENS</h1>
            </div>
            <div className="flex">
                <div className=" m-5 p-5 font-extralight">
                    <p className="border-b  inline-block p-4 text-2xl">Browse by</p>
                    <div className="flex flex-col mt-6 text-2xl font-extralight cursor-pointer">
                        <p className="mb-1">All Product</p>
                        <Link to="/men" className="mb-1">Mens</Link>
                        <Link to="/newdrop" className="mb-1">New Drops</Link>
                        <Link to="/women" className="mb-1">Women</Link>
                    </div>
                    {/* <div className="mt-10 text-2xl font-light ">
                        <p className=" border-b inline-block p-4">Filter by</p>
                        <div className="mt-3">
                            <p>Size</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox"  ></input>
                            <p>Large</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" ></input>
                            <p>Medium</p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" ></input>
                            <p>Small</p>
                        </div>
                    </div>  */}
                </div>
                
                <div className="m-5 p-4 ">
                    <h1 className="">{products.length} product{products.length !== 1 && "s"}</h1>
                    


                    <div className={`m-20 mt-10 grid grid-cols-4 gap-4 `}>
                        {products.map((data) => (
                            <div key={data._id} className="relative ">
                                <img src={data.image} className=" h-80 hover:scale-105 hover:transition-transform duration-150"></img>
                                <p className=" mt-2">{data.title}</p>
                                <p className="mb-3">${data.price}</p>
                                <div className="absolute top-0 left-0 bg-black text-white rounded px-3 group-hover:scale-105">
                                    <p className="">{data.tags}</p>
                                </div>
                                <div className="absolute bottom-20 left-18">
                                    <button onClick={() => addToCart(data._id)} className="bg-black rounded text-white px-5">Add Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Men