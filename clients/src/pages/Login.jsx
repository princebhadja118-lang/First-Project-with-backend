import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [message, setMessage] = useState("")
    const [sucessMessage, setSucessMessage] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {

        try {
            const res = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, pass
                })
            });
            const data = await res.json();
            if (res.ok) {
                setSucessMessage('Login Successfully')
                setMessage('')
            } else {
                setMessage(data.message || "Login failed.");
                setSucessMessage('')
            }
        } catch (err) {
            console.error("Error during registration:", error);
            setMessage("An error occurred during registration.");
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center w-full gap-2'>
                <p className='font-bold text-3xl p-2'>Login</p>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 rounded w-100 h-10 pl-2'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className='border-2 rounded w-100 h-10 pl-2'
                />
                <button onClick={handleLogin} className='border-2 p-2 w-50 rounded'>Login</button>
                {message && <p className='text-red-600'>{message}</p>}
                {sucessMessage && <p className='text-green-600'>{sucessMessage}</p>}
                <p>New User? <Link className='font-semibold' to={'/register'}>Start Your journey</Link> with us!</p>
            </div>
        </>
    )
}

export default Login