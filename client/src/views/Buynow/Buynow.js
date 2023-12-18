import axios from 'axios';
import "./Buynow.css"
import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';

function Buynow() {
const {id} = useParams();

const [deatail , setDeatail]=useState({});
const [charges, setCharges]=useState('50');
const [quantity , setQuantity] = useState(1);
const [shipaddress, setShipaddress] = useState('')

const loadDeatail = async ()=>{
          const responce = await axios.get(`/api/getproduct/${id}`)
          setDeatail(responce?.data?.data)
}

useEffect(()=>{
    loadDeatail()
  },[])

  const incQuantity = ()=>{
        setQuantity(quantity+1)
  }

  const decQuantity = ()=>{
    if(quantity=== 1){
      return;
    }
    setQuantity(quantity-1)
  }
  
  const localuser = JSON.parse(localStorage.getItem('localuser') || "{}");

const placeOrder = async ()=>{
  const responce = await axios.post("/api/order",
  {
    user:localuser._id,
    product:id,
    quantity:quantity,
    deliveryCharges:charges,
    shipingAddress:shipaddress
  }
);

if (responce?.data?.success) {
  alert(responce?.data?.message)
  window.location.href = "/order";
} else {
  alert(responce?.data?.message)
}
}
  return (
    <div>
        <Navbar/>
       <div className='deatal-contaier'>

         <div>
         <img className='product-img' src={deatail.image}/>
         </div>

          <div className='info-containeer'>
            <h1 className='product-name'>{deatail.name}</h1>
            <p className='product-brand'>Brand : {deatail.brand}</p>
            <p className='product-decr'><span className='dec'>Description</span> :<br/><br/>{deatail.description}</p>
            <h2 className='product-price'>₹ {deatail.price}</h2>

            <div className='radio-btn'>
                    <input type='radio'
                        name="charges" 
                        checked={charges === "50"}
                        onClick={() => {
                          setCharges('50')
                      }}
                    /> Regular delivery &nbsp;  &nbsp;

                    <input type='radio'
                        name="charges"
                        checked={charges === "100"}
                        onClick={() => {
                          setCharges('100')
                      }}
                    /> Fastest delivery
                </div>
                <p className='text-quan'>Quantity : </p>
                <span className='btn-inc' onClick={incQuantity}>➕</span>
                <span className='quantity-number'>{quantity}</span>
                <span className='btn-inc' onClick={decQuantity}>➖</span>

                <input placeholder='Shipping address'
                 className='input-adredss'
                 onChange={(e)=>{
                  setShipaddress(e.target.value)
                 }}
                 />
               <button type='button' onClick={placeOrder} className='place-order'>Place Order</button>
          </div>
       </div>
    </div>
  )
}

export default Buynow