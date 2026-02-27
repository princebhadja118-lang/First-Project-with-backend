import React, { Children, useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Admin = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <>
            <div className='flex gap-0.5 md:gap-1'>
                <div className='min-w-[15%] h-screen bg-red-500 '>
                    <Sidebar />
                </div>
                <div className='flex flex-col w-screen'>
                    <div className='flex flex-col md:flex-row justify-between items-center bg-red-500 h-28 p-3 shadow-lg gap-4'>
                        <div className='flex flex-col md:flex-row gap-3 items-center justify-end w-full '>
                            <h1 className='font-semibold text-xl md:text-2xl'>{user?.username}</h1>
                            <button onClick={logout} className='bg-white text-red-500 font-semibold px-5 py-2 rounded cursor-pointer shadow'>
                                Logout
                            </button>
                        </div>
                    </div>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Admin