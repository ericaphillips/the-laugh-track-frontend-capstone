import React, { useState, useEffect } from "react"

/*
    The context is used by individual components
    that need data about comedy specials
*/

export const SpecialContext = React.createContext()

//provider establishes what data can be used in return statement
export const SpecialProvider = (props) => {
    const [specials, setSpecials] = useState ([])
    
    const getSpecials = () => {
        return fetch("http://localhost:8088/specials")
        .then(response => response.json())
        .then(setSpecials)
    } 

    const addSpecial = special => {
        return fetch("http://localhost:8088/specials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(special)
        })
        .then(getSpecials)
    }

    const changeSpecial = special => {
        return fetch(`http://localhost:8088/specials/${special.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(special)
        })
        .then(getSpecials)
    }

    const deleteSpecial = specialId => {
        return fetch(`http://localhost:8088/specials/${specialId}`, {
            method: "DELETE"
        })
        .then(getSpecials)
    }

    return (
        <SpecialContext.Provider value={{
            specials, getSpecials, addSpecial, changeSpecial, deleteSpecial
        }}>
            {props.children}
        </SpecialContext.Provider>
    )
}