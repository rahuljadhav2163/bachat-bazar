import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./Orders.css"
import axios from 'axios';
function Orders() {

  const [orders, setOrders] = useState([]);

  const localuser = JSON.parse(localStorage.getItem('localuser'));

  const loadOrder = async () => {

    if (!localuser?._id) {
      return;
    }
    const responce = await axios.get(`/api/getorder/user/${localuser._id}`)
    setOrders(responce?.data?.data)
  }
  useEffect(() => {
    loadOrder()
  }, [])

  return (
    <div>
      <Navbar />
      <h1 className='text-center my-oder'>My Orders</h1>
      {
        orders?.map((order,index)=>{
              const {user,product,shipingAddress,quantity,deliveryCharges,status}=order;
              return(
                <div className='my-roder'>
                  <h1>{product.name}</h1>
                  <p>{user.number}</p>
                <p>{shipingAddress}</p>
                <p>{quantity} x {product.price} = ₹{quantity * product.price} </p>
                <p>Delivery Charges: ₹{deliveryCharges}</p>
                <span className='status'>{status}</span>
                </div>
              );
        })
      }
    </div>
  )
}

export default Orders

