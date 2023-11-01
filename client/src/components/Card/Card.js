import React from 'react'
import "./Card.css"
function Card({name,image,price,description}) {
  return (
    <div className='product-card-contain'>
        <img className='pruduct-image' src={image} alt='network error'/>
        <h2 className='text-center'>{name}</h2>
        <p className='text-center product-dec'>{description}</p>
        <p className='text-center product-price'>₹ {price}</p>
        <button className='product-buy-btn'>Buy Now</button>
    </div>
  )
}
export default Card
