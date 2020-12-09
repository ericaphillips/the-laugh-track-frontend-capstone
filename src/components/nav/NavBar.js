import React from "react"
import { Link } from 'react-router-dom'
import { Logout } from '../auth/Logout'
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navBar">
            <li className="navBar__item">
                <Link className="navBar__link" to="/">Home</Link>
            </li>
            <li className="navBar__item">
                <Link className="navBar__link" to="/comedians">Comedians</Link>
            </li>
            <li className="navBar__item">
                <Link className="navBar__link" to="/specials">Specials</Link>
            </li>
            <li className="navBar__item">
                <Link className="navBar__link" to="/profile">My Profile</Link>
            </li>
            <button className="logout--button" onClick={Logout}>
                            Log Out
                        </button>
        </ul>
        
    )
}