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
import SharedLayout from './pages/sharedLayout/SharedLayout'
import DashboardComponent from './Component/dashboard/DashboardComponent'
import UserComponent from './Component/UserDetails/UserComponent'
import CourseDetails from './Component/Student/Courses'
import Coursedetails from './Component/Course/Coursedetails'
import UserDetailsComponent from './Component/UserDetails/UserDetailsComponent'
import StudentCourse from './Component/Student/StudentCourse'

function App () {
  const [isAdmin, setIsAdmin] = useState(true)
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Routes>
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

          <Route path="/Admin/" element={} >

          </Route>
        </Routes> */}

         {/* {isDashboardVisible && <DashboardComponent />}
            {isUserVisible && <UserComponent />}
            {isUserUpdateVisible && <UserDetailsComponent />}
            {isCourseVisible && <StudentCourseComponent />}{' '} */}
        <Routes>
          <Route path="/email-verified" element={<EmailVerificationSuccess />} />

          <Route path='/login' element={<Login />} />
          <Route path='/' element={<SharedLayout/>} >
            <Route path='/AdminDashboard' Component={DashboardComponent} />
            <Route path='/Studentdashboard' Component={StudentCourse} />
            <Route path='/ShowCourseDetails' Component={Coursedetails} />
            <Route path='/manageEnrollment' Component={UserComponent} />
            <Route path='/courses' Component={StudentCourse} />
            <Route path='/courseProgress/:courseId' Component={CourseDetails} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
