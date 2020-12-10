import React, { useState, useEffect } from "react"

/*
Context used by SpecialForm component.
Sends information from Special Genre Table
to the special form dropdown
*/

export const SpecialGenreContext = React.createContext()

export const SpecialGenreProvider = (props) => {
    const [specialGenres, setSpecialGenres] = useState([])

    const getSpecialGenres = () => {
        return fetch("http://localhost:8088/specialGenres")
        .then(response => response.json())
        .then(setSpecialGenres)
    }

        return (
            <SpecialGenreContext.Provider value={{
                specialGenres, getSpecialGenres
            }}>
                {props.children}
            </SpecialGenreContext.Provider>
        )
    
}