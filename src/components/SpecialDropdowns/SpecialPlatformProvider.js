import React, { useState, useEffect } from "react"

/* Context used by SpecialForm component.
Sends information from Special Platform table 
to the special form dropdown
*/

export const SpecialPlatformContext = React.createContext()

export const SpecialPlatformProvider = (props) => {
    const [specialPlatforms, setSpecialPlatforms] = useState([])

    const getSpecialPlatforms = () => {
        return fetch("http://localhost:8088/specialPlatforms")
        .then(response => response.json())
        .then(setSpecialPlatforms)
    }

    return (
        <SpecialPlatformContext.Provider value={{
            specialPlatforms, getSpecialPlatforms
        }}>
            {props.children}
        </SpecialPlatformContext.Provider>
    )
}