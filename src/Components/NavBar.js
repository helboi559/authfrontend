import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <nav>
            <h3>NavBar</h3>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/registration">Registration</Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar