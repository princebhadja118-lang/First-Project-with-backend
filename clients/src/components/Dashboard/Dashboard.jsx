import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import logo from "../../assets/rklogo-removebg-preview.png"
import Home from './Home'
import About from './About'
import Products from './Products'


const Dashboard = () => {

    const { logout, user } = useContext(AuthContext)
    const [menu, setMenu] = useState(false)

    return (
        <>
            <div className='min-h-screen bg-gray-100 p-6'>
                <div className=' flex md:flex-row sm:text-sm flex-col justify-between gap-2 items-center bg-red-500 text-white p-4 rounded border-b-2 border-red-600 shadow-lg transition-all duration-300 '>
                    <div className='flex md:gap-0 w-full justify-between items-center'>
                        <img src={logo} alt="Rk logo" className='w-20 h-10 md:w-35 md:h-15 ' />
                        <button onClick={() => setMenu((prev) => !prev ? true : false)} className='flex md:hidden'><i className="fa-solid fa-bars"></i></button>
                    </div>
                    <div className='md:flex-row md:flex hidden items-center md:gap-5 '>
                        <div className='bg-red-300 px-3 flex items-center  w-28 lg:w-full'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="search" placeholder='Search...' className='px-3 py-2 bg-transparent border-0 outline-0 rounded' />
                        </div>
                        <a>Home</a>
                        <a>Products</a>
                        <a>About</a>
                        <a>Contact</a>
                    </div>
                    <div className='md:flex hidden  md:gap-3 items-center shadow px-2 bg-red-600 hover:shadow-lg hover:bg-red-700'>
                        <code className='text-2xl text-black p-5 font-bold '>{user?.username}</code>
                        <button onClick={logout} className='bg-white font-bold text-red-500 px-4 py-2 h-10 rounded cursor-pointer'>
                            Logout
                        </button>

                    </div>

                    {menu && (
                        <div className='md:hidden'>
                            <div className='md:flex-row flex flex-col items-center md:gap-5 transition-all duration-300 '>
                                <div className='bg-red-300 px-3 flex items-center'>
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                    <input type="search" placeholder='Search...' className='px-3 py-2 bg-transparent border-0 outline-0 rounded' />
                                </div>
                                <a>Home</a>
                                <a>Products</a>
                                <a>About</a>
                                <a>Contact</a>
                            </div>
                            <div className='flex flex-col md:flex-row md:gap-3 items-center '>
                                <code className='text-2xl text-black p-2 font-bold '>{user?.username}</code>
                                <button onClick={logout} className='bg-white font-bold text-red-500 px-4 py-2 h-10 rounded cursor-pointer'>
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <Home />
                <About />
                <Products />
            </div>

        </>
    )
}

export default Dashboard