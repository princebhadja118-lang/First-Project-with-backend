import React, { useState } from 'react'
import logo from "./../assets/rklogo-removebg-preview.png"
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {

    const [menu, setMenu] = useState(false)

    return (
        <>
            <div>
                <div className='flex flex-col gap-2 justify-between items-center'>
                    <img src={logo} alt="Rk logo" className='h-10 w-20 md:h-15 md:w-30' />
                    <button onClick={() => setMenu((prev) => !prev ? true : false)} className='flex text-white md:hidden'><i className="fa-solid fa-bars"></i></button>
                </div>
                {menu &&
                    <div className='flex flex-col pl-1 text-sm gap-3 pt-2 text-white'>
                        <NavLink to="profile">Profile</NavLink>
                        <NavLink to="user">User</NavLink>
                        <NavLink to="product">Products</NavLink>
                    </div>
                }
                <div className='md:flex md:flex-col pt-3 pl-2 gap-3 font-semibold text-white hidden'>
                    <NavLink to="profile">Profile</NavLink>
                    <NavLink to="user">User</NavLink>
                    <NavLink to="product">Products</NavLink>
                </div>
            </div>

        </>
    )
}

export default Sidebar