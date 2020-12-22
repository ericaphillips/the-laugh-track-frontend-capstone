import React, { useState, useEffect } from "react"

/*
    The context is used by individual components
    that need data about comedy specials
*/

export const SpecialContext = React.createContext()

//provider establishes what data can be used in return statement
export const SpecialProvider = (props) => {
    const [specials, setSpecials] = useState ([])
    const [ searchTerms, setSearch ] = useState("")
    
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

    // const sortSpecialNumAsc = () => {
    //     return fetch("http://localhost:8088/specials?_sort=rating&_order=asc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }

    // const sortSpecialNumDesc = () => {
    //     return fetch("http://localhost:8088/specials?_sort=rating&_order=desc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }

    // const sortSpecialNameAlphaAsc = () => {
    //     return fetch("http://localhost:8088/specials?_sort=name&_order=asc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }

    // const sortSpecialComicNameAlphaAsc = () => {
    //     return fetch("http://localhost:8088/specials?_sort=name&_order=asc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }

    // const sortSpecialRuntimeAsc= () => {
    //     return fetch("http://localhost:8088/specials?_sort=specialLengthId&_order=asc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }

    // const sortSpecialPlatformAsc= () => {
    //     return fetch("http://localhost:8088/specials?_sort=specialPlatformId&_order=asc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }

    // const sortSpecialChronoAsc= () => {
    //     return fetch("http://localhost:8088/specials?_sort=id&_order=asc")
    //     .then(response => response.json())
    //     .then(setSpecials)
    // }


    return (
        <SpecialContext.Provider value={{
            specials, getSpecials, setSpecials, addSpecial, changeSpecial, deleteSpecial, 
            // sortSpecialNumAsc, sortSpecialNumDesc, sortSpecialNameAlphaAsc, sortSpecialComicNameAlphaAsc, sortSpecialRuntimeAsc, sortSpecialPlatformAsc, sortSpecialChronoAsc, 
            searchTerms, setSearch
        }}>
            {props.children}
        </SpecialContext.Provider>
    )
}