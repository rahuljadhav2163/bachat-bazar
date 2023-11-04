import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.css"
function Card({id,name,image,price,description}) {
  return (
    <div className='product-card-contain'>
        <img className='pruduct-image' src={image} alt='network error'/>
        <h2 className='text-center'>{name}</h2>
        <p className='text-center product-dec'>{description}</p>
        <p className='text-center product-price'>₹ {price}</p>
        <Link to={`/buynow/${id}`} className='product-buy-btnn'> Buy Now 
        </Link>
        </div>
  )
}
export default Card
