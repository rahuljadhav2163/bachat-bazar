import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from "axios"
import Card from '../../components/Card/Card';
import "./Home.css"
export default function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');



  const searchProduct = async () => {

    if (search === '') {
      getProduct();
      return;
    }

    const response = await axios.get(`/api/searchproduct?q=${search}`)
    setProducts(response?.data?.data)
  }

  useEffect(() => {
    searchProduct();
  }, [search])

  

  const getProduct = async () => {
    try{
      const responce = await axios.get('/api/getproducts');
      setProducts(responce?.data?.data)
    }
    catch(err){
      console.log(err.message)
    }
  }
  
  useEffect(() => {
    getProduct();
  }, [])

  return (
    <div>
      <Navbar/>

      <input
      type='text'
       className='search-box'
        placeholder='Search Product'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />

      <div className='products-container'>
        {
          products?.map((product, index) => {
            const { name, image, price, description, _id } = product;
            return (
              <Card
              key={index}
                name={name}
                image={image}
                price={price}
                description={description}
                id={_id}
              />
            )
          })
        }
      </div>
    </div>
  )
}
