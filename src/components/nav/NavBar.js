import React, { useContext, useEffect } from "react"
import { Link, Route } from 'react-router-dom'
import { Logout } from '../auth/Logout'
import "./NavBar.css"

export const NavBar = (props) => {

    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    return (
        <ul className="navBar">
            <li className="navBar__item">
            <button onClick={() => {
                props.history.push("/home")
            }}>Home</button>
            </li>
            <li className="navBar__item">
            <button onClick={() => {
                props.history.push("/comedians")
            }}>Comedians</button>
            </li>
            <li className="navBar__item">
            <button onClick={() => {
                props.history.push("/specials")
            }}>Specials</button>
            </li>
            <li className="navBar__item">
            <button onClick={() => {
                props.history.push(`/users/${currentUser}`)
            }}>My Profile</button>
            </li>
            <Route render={
                props => <Logout {...props} />
            } />
        </ul>
        
    )
}