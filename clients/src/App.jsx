import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './components/Dashboard/Dashboard'
import ProtectedRoute from './auth/ProtectedRoute'
import Admin from './pages/Admin/Admin'
import Unauthorized from './pages/Unauthorized'
import User from './pages/Admin/User'
import Profile from './pages/Admin/Profile'
import Product from './pages/Admin/Product'
import Home from './components/Dashboard/Home'
import Products from './components/Dashboard/Products'
import About from './components/Dashboard/About'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='uproduct' element={<Products />} />
        </Route>

        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route path='profile' element={<Profile />} />
          <Route path='user' element={<User />} />
          <Route path='product' element={<Product />} />
        </Route>

        <Route path='/unauthorized' element={<Unauthorized />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App