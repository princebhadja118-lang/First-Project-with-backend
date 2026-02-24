import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    // const { login, user } = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const [sucessMessage, setSucessMessage] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const navigate = useNavigate()

    const handleRegister = async () => {
        // login({
        //     email, pass, role: "admin"
        // })
        // console.log(user);
        try {
            const res = await fetch('http://localhost:5000/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName, email, pass
                })
            });
            const data = await res.json();
            if (res.ok) {
                setSucessMessage("Registration successful!");
                navigate('/login')
            } else {
                setMessage(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("An error occurred during registration.");
        }

    }

    return (
        <>
            <div>
                <div className='flex flex-col gap-2 justify-center items-center w-full'>
                    <p className='font-bold text-3xl p-2'>Register</p>
                    <input
                        type='text'
                        placeholder='User Name'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='border-2 rounded w-100 h-10 pl-2'
                    />
                    <input
                        type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 rounded w-100 h-10 pl-2'
                    />
                    <input
                        type="password"
                        placeholder='Enter Password'
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        className='border-2 rounded w-100 h-10 pl-2'
                    />
                    <button onClick={handleRegister} className='border-2 rounded p-2 w-50 m-2'>Register</button>
                    {message && <p className='text-red-600'>{message}</p>}
                    {sucessMessage && <p className='text-green-600'>{sucessMessage}</p>}
                </div>
            </div>
        </>
    )
}

export default Register