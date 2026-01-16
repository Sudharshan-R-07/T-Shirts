import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    
    const [show,setShow]=useState(true)
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

      
    

  useEffect(() => {
    fetch("https://t-shirts-2.onrender.com/api/products")
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
   if (loading) 
    return(<>
    <div class="flex items-center justify-center h-screen">
  <div class="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
</div>

    </>
    )
   
 
 



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

            <h1 className="text-3xl font-bold text-center">New Drops</h1>
            <div ref={ref} className={`m-20 mt-10  grid grid-cols-4 gap-1  transition-all duration-700 ${show?"animate-fade-up":"opacity-0"}  `}>
                {products.map((data) => (
                    <div key={data._id} className="relative">
                        <img src={data.image} className=" h-80 hover:scale-105 hover:transition-transform duration-150"></img>
                        <p className=" mt-2">{data.title}</p>
                        <p className="mb-3">${data.price}</p>
                        <div className="absolute top-0 left-0 bg-black text-white rounded px-3 group-hover:scale-105">
                            <p className="">{data.isBestSeller}</p>


                        </div>
                        <div className="absolute bottom-20 left-18">
                            <button onClick={() => addToCart(data._id)} className="bg-black rounded text-white px-5">Add Cart</button>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button className="bg-black text-white rounded px-3 cursor-pointer p-3 hover:scale-120">Show More</button>
            </div>
           

        </>
    )
}

export default Home