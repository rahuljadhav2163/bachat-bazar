import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import "./Login.css"
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {

    const responce = await axios.post("/api/login",
      {
        email: email,
        password: password
      }
    );

    alert(responce?.data?.message)

    if (responce?.data?.success) {
      localStorage.setItem('localuser', JSON.stringify(responce.data.data))
      window.location.href = "/";
  }
  }

  return (
    <div>
      <Navbar/>
      <form className='signup-box'>
  <h1 className='heading-signup'>Login</h1>

  <input
    type='text'
    className='input-box'
    placeholder='email'
    onChange={(e) => {
      setEmail(e.target.value);
    }}
  />

  <input
    type='password'
    className='input-box'
    placeholder='password'
    onChange={(e) => {
      setPassword(e.target.value);
    }}
  />

  <button type='button' onClick={login} className='btnn'>Login</button>

  <p className='heading-signup'>
    <Link to="/signup">Create an account</Link>
  </p>
</form>

    </div>
  )
}
export default Login
