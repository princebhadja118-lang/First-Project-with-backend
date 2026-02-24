import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {

    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/" replace />
    }

    if (role && user.role !== role) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}

export default ProtectedRoute