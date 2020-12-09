import React from "react"
import { Route } from "react-router-dom"
import { Logout } from "./auth/Logout"

export const ApplicationViews = (props) => {
    return (
        <>
        <button className="logout--button" onClick={Logout}>
                            Log Out
                        </button>
        </>
    )
}
