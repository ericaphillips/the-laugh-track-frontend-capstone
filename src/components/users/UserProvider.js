import React, { useState } from "react"

/*
    The context is used by individual components
    that need data about users
*/

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState ([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(setUsers)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers
        }}>
        {props.children}
        </UserContext.Provider>
    )
}