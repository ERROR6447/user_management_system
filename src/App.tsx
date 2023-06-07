import React, { useState } from 'react'
import Login from './pages/auth/Login/Login'

import Nav from './Component/Navbar/Nav'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import './App.css'
import EmailVerificationSuccess from './pages/auth/verify_email/EmailVerifyPage'

function App () {
  const [isAdmin, setIsAdmin] = useState(true)
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/Admindashboard"
            element={<Nav isAdmin={true}/> }
          />
          <Route
            path="/Studentdashboard"
            element={<Nav isAdmin={false}/> }
          />
          <Route path="/email-verified" element={<EmailVerificationSuccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
