import React, { useContext, useEffect } from "react"
import { Link, Route } from 'react-router-dom'
import { Logout } from '../auth/Logout'
import logo from "../pictures/full_logo_trans.png"
import "./NavBar.css"

export const NavBar = (props) => {

    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    return (
        <>
        <div className="navBar__top">
         <img id="logo" alt="Laugh Track Logo" src={logo} />
         <Route render={
                    props => <Logout {...props} />
                } />
        </div>
        <div className="navBar__bottom">
            <button onClick={() => {
                props.history.push("/home")
            }}>Home</button>
            <button onClick={() => {
                props.history.push("/comedians")
            }}>Comedians</button>
            <button onClick={() => {
                props.history.push("/specials")
            }}>Specials</button>
            <button onClick={() => {
                props.history.push(`/users/${currentUser}`)
            }}>My Profile</button>
        </div>
        </>
    )
                
}