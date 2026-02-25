import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'

const Login = () => {
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const { user, login } = useContext(AuthContext)


    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, pass })
            });
            const data = await res.json();
            if (res.ok) {
                login(data.user);
                setMessage('Login successful!')
                setIsSuccess(true)
                if (data.user.role === "admin") {
                    navigate('/admin')
                } else {
                    navigate("/dashboard")
                }

            } else {
                setMessage(data.message || "Login failed.")
                setIsSuccess(false)
            }
        } catch (err) {
            setMessage("An error occurred during login.")
            setIsSuccess(false)
        }
    }

    const handleshowpass = () => {
        if (showPass === false) return setShowPass(true)
        else return setShowPass(false)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
                <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>Welcome Back</h1>

                <div className='space-y-4'>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    />
                    <div className='flex border border-gray-300 rounded-lg focus:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus:border-transparent transition'>
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder='Password'
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className='w-full px-4 py-3 focus:outline-none '
                        />
                        <button onClick={handleshowpass} className='pr-2  cursor-pointer'>
                            {showPass ? (<i className="fa-solid fa-eye-slash"></i>) : (<i className="fa-solid fa-eye"></i>)}
                        </button>
                    </div>
                    <button
                        onClick={handleLogin}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg hover:shadow-xl cursor-pointer'
                    >
                        Login
                    </button>
                </div>

                {message && (
                    <p className={`mt-4 text-center font-medium ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}

                <p className='mt-6 text-center text-gray-600'>
                    New User? <Link className='text-blue-600 font-semibold hover:underline' to='/register'>Start Your Journey</Link> with us!
                </p>
            </div>
        </div>
    )
}

export default Login