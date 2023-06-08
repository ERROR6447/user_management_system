import React, { useState, useEffect, Children } from 'react'
import './Nav.css'

import DashboardComponent from '../dashboard/DashboardComponent'
import UserComponent from '../UserDetails/UserComponent'
import UserDetailsComponent from '../UserDetails/UserDetailsComponent'

import StudentCourseComponent from '../Student/StudentCourse'
import { Link, useNavigate } from 'react-router-dom'
import { setCookie } from 'react-use-cookie'

const Navbar = ({ isAdmin, children }: any) => {
  // Accept a prop "isAdmin" to determine the user role
  const [isMenuOpen, setMenuOpen] = useState(window.innerWidth >= 700)
  const [isMobile, setIsMobile] = useState(false)
  const [isDashboardVisible, setDashboardVisible] = useState(false)
  const [isUserVisible, setUserVisible] = useState(false)
  const [isUserUpdateVisible, setUserUpdateVisible] = useState(false)
  const [isCourseVisible, setCourseVisible] = useState(false) // Added state for course visibility
  const navigator = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const showDashboard = () => {
    setDashboardVisible(true)
    setUserVisible(false)
    setUserUpdateVisible(false)
    setCourseVisible(false)
  }

  const showUser = () => {
    setDashboardVisible(false)
    setUserVisible(true)
    setUserUpdateVisible(false)
    setCourseVisible(false)
  }

  const showUserUpdate = () => {
    setDashboardVisible(false)
    setUserVisible(false)
    setUserUpdateVisible(true)
    setCourseVisible(false)
  }

  const showCourse = () => {
    setDashboardVisible(false)
    setUserVisible(false)
    setUserUpdateVisible(false)
    setCourseVisible(true)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 700)
    }

    handleResize() // Check initial screen width
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleSignout (event: any): void {
    setCookie('token', '', { path: '/' })
    navigator('/login')
  }

  return (
    <div>
      <div className="top-bar">
        {isMobile && (
          <i
            className={`nav__toggle fa ${
              isMenuOpen ? 'fa-times' : 'fa-bars'
            } m-2`}
            aria-hidden="true"
            onClick={toggleMenu}
          ></i>
        )}
        {!isMobile && (
          <img
            className="logo__icon ms-2"
            src="https://www.youshe.id/favicon.ico"
            alt="Logo"
            onClick={toggleMenu}
          />
        )}
        {/* <strong>Edu <span>Hub</span></strong> */}
        <div className="dropdown fixed-bottom-dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://via.placeholder.com/50"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <Link className="dropdown-item" to="/profile">
                <i className="fa fa-user-circle" aria-hidden="true"></i> Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              {/* <Link className="dropdown-item" to="/">
                <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
              </Link> */}
              <div onClick={handleSignout} >
                <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="d-flex">
        {isMenuOpen && (
          <div>
            <nav className={`nav ${isMobile ? 'show' : ''}`}>
              <div className="m-logo">
                <img
                  className="logo__icon"
                  src="https://www.youshe.id/favicon.ico"
                  alt="Logo"
                />
                <strong>
                  Edu <span>Hub</span>
                </strong>
              </div>
              <hr />
              {isAdmin === true && (
  <>
    <Link
      className="nav__item mt-4"
      role="button"
      to="/AdminDashboard"
      style={{
        textDecoration: 'none',
        color: 'white'
      }}
    >
      <i className="fa fa-home" aria-hidden="true"></i>
      <span>Dashboard</span>
    </Link>
    <Link className="nav__item" role="button" to='/manageEnrollment' style={{
      textDecoration: 'none',
      color: 'white'
    }}>
      <i className="fa fa-users" aria-hidden="true"></i>
      <span>Manage Students</span>
    </Link>
    <Link
      className="nav__item"
      role="button"
      // onClick={showUserUpdate}
      to="/gradeStudent"
      style={{
        textDecoration: 'none',
        color: 'white'
      }}
    >
      <i className="fa fa-user" aria-hidden="true"></i>
      <span>Student Update</span>
    </Link>
  </>
              )}

{isAdmin === false && (
  <Link className="nav__item" role="button" to='/courses'
  style={{
    textDecoration: 'none',
    color: 'white'
  }}
  >
    <i className="fa fa-graduation-cap" aria-hidden="true"></i>
    <span>Courses</span>
  </Link>
)}

<div className="nav-footer" onClick={toggleMenu}>
  <i className="fa fa-angle-left" aria-hidden="true"></i>
</div>

            </nav>
          </div>
        )}

        <main className="main">
          <div className="title-bar text-center me-4">
            <h2>Overview</h2>
          </div>
          <div className="content-area">
          {!isDashboardVisible &&
  !isUserVisible &&
  !isUserUpdateVisible &&
  !isCourseVisible && (
    <p className="text-center">
      {isAdmin === true
        ? (
        <>
          Welcome Admin{' '}
          <i className="fa fa-smile-o" aria-hidden="true"></i>
        </>
          )
        : (
        <>
          Welcome Student{' '}
          <i className="fa fa-smile-o" aria-hidden="true"></i>
        </>
          )}
    </p>
          )}

           {children}
            {/* Render student course component */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Navbar
