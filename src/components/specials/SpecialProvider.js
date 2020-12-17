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

    const sortSpecialNumAsc = () => {
        return fetch("http://localhost:8088/specials/rating?_sort=views&_order=asc")
        .then(response => response.json())
        .then(setSpecials)
    }

    const sortSpecialNumDesc = () => {
        return fetch("http://localhost:8088/specials/rating?_sort=views&_order=desc")
        .then(response => response.json())
        .then(setSpecials)
    }

    const sortSpecialNameAlphaAsc = () => {
        return fetch("http://localhost:8088/specials/name?_sort=views&_order=asc")
        .then(response => response.json())
        .then(setSpecials)
    }

    const sortSpecialComicNameAlphaAsc = () => {
        return fetch("http://localhost:8088/specials/comicName?_sort=views&_order=asc")
        .then(response => response.json())
        .then(setSpecials)
    }

    const sortSpecialRuntimeAsc= () => {
        return fetch("http://localhost:8088/specials/specialLengthId?_sort=views&_order=asc")
        .then(response => response.json())
        .then(setSpecials)
    }

    const sortSpecialPlatformAsc= () => {
        return fetch("http://localhost:8088/specials/specialPlatformId?_sort=views&_order=asc")
        .then(response => response.json())
        .then(setSpecials)
    }

    const sortSpecialChronoAsc= () => {
        return fetch("http://localhost:8088/specials/id?_sort=views&_order=asc")
        .then(response => response.json())
        .then(setSpecials)
    }

    return (
        <SpecialContext.Provider value={{
            specials, getSpecials, addSpecial, changeSpecial, deleteSpecial, sortSpecialNumAsc, sortSpecialNumDesc, sortSpecialNameAlphaAsc, sortSpecialComicNameAlphaAsc, sortSpecialRuntimeAsc, sortSpecialPlatformAsc, sortSpecialChronoAsc
        }}>
            {props.children}
        </SpecialContext.Provider>
    )
}