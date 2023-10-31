import { useEffect, useState } from "react"
import React  from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
function Navbar() {

const [user , setUser] = useState({});

useEffect(()=>{
  const localuser = JSON.parse(localStorage.getItem('localuser') || "{}");
  setUser(localuser);
})

const logout  = ()=>{
  localStorage.removeItem('localuser');
  window.location.href= '/login';
  alert('Logout Succesfully..!')
}

  return (
    <div>
        <div className='nav'>
            <p className='logo'>Bachat Bazar</p>
            <div className='link-container'>
            <p className='link'><Link to='/'>Home</Link></p>
               
               {
                user?.name ? <p className='link'><Link to='/order'>My Orders</Link></p>
                 :
                <span className="btnn-contaain">
                  <p className='link'><Link to='/signup'>Signup</Link></p>
                <p className='link'><Link to='/login'>login</Link></p>
                </span>
               }

               
                
            </div>
            <p className="username">👤{user?.name || "Hello User"}</p>
           {
            user?.name ?  <p className="logpout" onClick={logout}>Logout</p> : null
           }
        </div>
    </div>
  )
}
export default Navbar