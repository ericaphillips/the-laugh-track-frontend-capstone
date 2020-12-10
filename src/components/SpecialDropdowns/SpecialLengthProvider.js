import React, { useState, useEffect } from "react"

/* Context used by SpecialForm component.
Sends information from Special Length table
to the special form dropdown
*/

export const SpecialLengthContext = React.createContext()

export const SpecialLengthProvider = (props) => {
    const [specialLengths, setSpecialLengths] = useState([])

    const getSpecialLengths = () => {
        return fetch("http://localhost:8088/specialLengths")
        .then(response => response.json())
        .then(setSpecialLengths)
    }
    return (
        <SpecialLengthContext.Provider value={{
            specialLengths, getSpecialLengths
        }}>
            {props.children}
        </SpecialLengthContext.Provider>
    )
}