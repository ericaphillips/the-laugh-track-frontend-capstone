import React, { useState } from "react"

/*
This context is used by individual components
that need data about comedians
*/

export const ComedianContext = React.createContext()

//provider establishes what data can be used in return statement
export const ComedianProvider = (props) => {
    const [comedians, setComedians] = useState ([])
    const [ searchTerms, setSearch ] = useState("")

    const getComedians = () => {
        return fetch("http://localhost:8088/comedians")
        .then(response => response.json())
        .then(setComedians)

    }
    const addComedian = comedian => {
        return fetch("http://localhost:8088/comedians", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comedian)
        })
    .then(getComedians)
    }

    const changeComedian = comedian => {
        return fetch(`http://localhost:8088/comedians/${comedian.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comedian)
        })
        .then(getComedians)
    }

    const deleteComedian = comedianId => {
        return fetch(`http://localhost:8088/comedians/${comedianId}`, {
        method: "DELETE"
        })
        .then(getComedians)
    }

    return (
        <ComedianContext.Provider value={{
            comedians, getComedians, setComedians, addComedian, changeComedian, deleteComedian, searchTerms, setSearch
        }}>
            {props.children}
        </ComedianContext.Provider>
    )
}