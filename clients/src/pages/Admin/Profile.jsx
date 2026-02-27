import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import AdminProfile from './AdminProfile'

const Profile = () => {

    const { user, logout } = useContext(AuthContext)
    const [showUForm, setShowUForm] = useState(false)

    return (
        <>
            <div className='py-36 p-2 md:py-24 lg:py-34.5 bg-gray-100 md:p-6 '>
                <div className='max-w-lg mx-auto bg-white shadow-lg rounded-lg p-2 md:p-6'>
                    <h2 className='text-xl md:text-3xl font-bold mb-2 md:mb-6 text-center'>My Profile</h2>
                    <div className='text-sm md:text-xl'>
                        <div className='flex gap-1'>
                            <p className='text-gray-700'>Username:</p>
                            <p className='font-semibold'>{user?.username}</p>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-gray-700'>Email:</p>
                            <p className='font-semibold'>{user?.email}</p>
                        </div>
                        <div className='flex gap-1'>
                            <p className='text-gray-700'>Role:</p>
                            <p className='font-semibold'>{user?.role}</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-2 md:mt-6' >
                        <button onClick={() => setShowUForm(true)} className='bg-blue-500 text-white px-1 md:px-4 py-2 rounded cursor-pointer'>
                            Edit Profile
                        </button>
                        <button onClick={logout} className='bg-red-500 text-white px-1 md:px-4 py-2 rounded cursor-pointer'>
                            Logout
                        </button>
                    </div>
                    <div>
                        {showUForm && (
                            <AdminProfile
                                setShowUForm={setShowUForm}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile