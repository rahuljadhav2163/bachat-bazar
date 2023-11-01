import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from "axios"
import Card from '../../components/Card/Card';
import "./Home.css"
export default function Home() {

  const [products, setProducts] = useState([]);


  const getProduct = async () => {
    const responce = await axios.get('getproducts');
    setProducts(responce?.data?.data)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      <Navbar />
           <div className='products-container'>
           {
              products.map((product,index)=>{
               const {name,image,price,description}=product;
               return(
                 <Card 
                 name={name}
                 image={image}
                 price={price}
                 description={description}
                 />
               )
              })
            }
           </div>
    </div>
  )
}
