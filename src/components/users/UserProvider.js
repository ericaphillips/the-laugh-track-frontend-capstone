import React, { useState } from "react"

/*
    The context is used by individual components
    that need data about users
*/

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState ([])
    const [usersRatingAsc, setUsersRatingAsc ] = useState ([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(setUsers)
    }

    const addProfPic = (id, profPic) => {
        return fetch(`http://localhost:8088/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                profPic
            )
        })
        .then(getUsers)
    }

    const addDescription = (id, description) => {
        return fetch(`http://localhost:8088/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                description
            )
        })
        .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, addProfPic, addDescription, usersRatingAsc, setUsersRatingAsc
        }}>
        {props.children}
        </UserContext.Provider>
    )
}