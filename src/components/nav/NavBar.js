import React, { useContext, useEffect } from "react"
import { Link, Route } from 'react-router-dom'
import { Logout } from '../auth/Logout'
import logo from "../pictures/full_logo_trans_new.png"
import "./NavBar.css"

export const NavBar = (props) => {

    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    return (
        <>
        <div className="navBar">
        <div className="navbar__left">
        <Link to={`/home`}>
         <img id="logo" alt="Laugh Track Logo" src={logo} />
         </Link>
         </div>
         <div className="navbar__right">
            <button className="nav__button" onClick={() => {
                props.history.push("/home")
            }}>Home</button>
            <button className="nav__button" onClick={() => {
                props.history.push("/comedians")
            }}>Comedians</button>
            <button className="nav__button" onClick={() => {
                props.history.push("/specials")
            }}>Specials</button>
            <button className="nav__button" onClick={() => {
                props.history.push(`/users/${currentUser}`)
            }}>My Profile</button>
            <Route render={
                    props => <Logout {...props} />
                } />
                </div>
        </div>
        </>
    )
                
}