import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from "axios"
import Card from '../../components/Card/Card';
import "./Home.css"
export default function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  console.log(products);

  const searchProduct = async () => {

    if (search === '') {
      getProduct();
      return;
    }

    const response = await axios.get(`/searchproduct?q=${search}`)
    console.log(response?.data?.data)
    setProducts(response?.data?.data)
  }
  useEffect(() => {
    searchProduct();
  }, [search])

  console.log(products);

  const getProduct = async () => {
    try{
      const responce = await axios.get('/getproducts');
      setProducts(responce?.data?.data)
    }
    catch(err){
      alert(err)
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
