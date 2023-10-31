import React, { useState } from 'react';
import axios from "axios"
import "./Signup.css"
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [passwoard, setPassword] = useState('');
    const [number, setNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('male');

    const signup = async () => {
        if (!name) {
            alert("name is required")
            return;
        }
        if (!email) {
            alert("email is required")
            return;
        }
        if (!passwoard) {
            alert("passwoard is required")
            return;
        }
        if (!number) {
            alert("number is required")
            return;
        }
        if (!address) {
            alert("address is required")
            return;
        }

        const responce = await axios.post("/signup",
            {
                name: name, 
                email:email, 
                passwoard:passwoard, 
                number : number, 
                address:address,
                 gender: gender
            }
        );

        if (responce?.data?.success) {
            alert(responce?.data?.message)
            window.location.href = "login";
        } else {
            alert(responce?.data?.message)
        }
    }

    return (
        <div>

            <form className='signup-box'>
                <h1 className='heading-signup'>Signup</h1>

                <input type='text'
                    className='input-box'
                    placeholder='Enter name'
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />

                <input type='text'
                    className='input-box'
                    placeholder='Enter email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />

                <input type='text'
                    className='input-box'
                    placeholder='Enter number'
                    onChange={(e) => {
                        setNumber(e.target.value)
                    }}
                />

                <input type='text'
                    className='input-box'
                    placeholder='Enter passwoard'
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <input type='text'
                    className='input-box'
                    placeholder='Enter address'
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                />

                <div>
                    <input type='radio'
                        name="gender"
                        checked={gender === "male"}
                        onClick={() => {
                            setGender('male')
                        }}
                    />Male


                    <input type='radio'
                        name="gender"
                        checked={gender === "female"}
                        onClick={() => {
                            setGender('female')
                        }}
                    />Female
                </div>

                <button type='button' onClick={signup} className='btnn'>Signup</button>
            </form>
        </div>
    )
}

export default Signup 