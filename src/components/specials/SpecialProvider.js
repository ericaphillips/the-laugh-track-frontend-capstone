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

    return (
        <SpecialContext.Provider value={{
            specials, getSpecials, addSpecial
        }}>
            {props.children}
        </SpecialContext.Provider>
    )
}