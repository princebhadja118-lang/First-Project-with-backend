import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const AdminProfile = ({ setShowUForm }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleshowpass = () => {
        if (showPass === false) return setShowPass(true)
        else return setShowPass(false)
    }

    return (
        <>
            <div className='fixed inset-0 bg-black/50 flex justify-center items-center transition-transform ease-in-out'>
                <div className='md:min-w-md flex flex-col gap-2 items-center justify-center p-3 fixed bg-white rounded shadow-2xl'>
                    <div className='flex justify-center items-center w-full '>
                        <h1 className='text-xl md:text-3xl font-semibold'>Edit Admin Profile</h1>
                        <div className='absolute flex justify-end items-end w-full pr-2'>
                            <button className='cursor-pointer' onClick={() => setShowUForm(false)}>
                                <IoClose size={25} md:size={30} />
                            </button>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border px-3 py-3 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
                    />
                    <div className='flex w-full px-3 py-3 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition'>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder='New Password'
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className='w-full outline-none'
                        />
                        <button className='pr-2 cursor-pointer' onClick={handleshowpass}>
                            {showPass ? (<i className="fa-solid fa-eye-slash"></i>) : (<i className="fa-solid fa-eye"></i>)}
                        </button>
                    </div>
                    <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white w-full rounded cursor-pointer' onClick={() => { setShowUForm(false) }}>Update</button>
                </div>
            </div>
        </>
    )
}

export default AdminProfile