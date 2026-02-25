import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import Admin from './pages/Admin';
import Unauthorized from './pages/Unauthorized';
// import Admin from './pages/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin' element={
            <ProtectedRoute allowedRoles={["admin"]} >
              <Admin />
            </ProtectedRoute>
          } />
          <Route path='unauthorized' element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App