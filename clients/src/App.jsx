import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
// import Admin from './pages/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App