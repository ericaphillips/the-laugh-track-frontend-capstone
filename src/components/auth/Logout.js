import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"

export const Logout = (props) => {
    const handleLogout = (l) => {
        l.preventDefault()
    localStorage.setItem("app_user_id", "")
    props.history.push("/login")
    }

   return ( <button className="logout--button" onClick={handleLogout}>
                            Log Out
                        </button>
   )
}
