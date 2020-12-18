import React, { useContext } from "react"
import { ComedianContext } from "./ComedianProvider"
import "./Comedian.css"

export const ComedianSearch = (props) => {
    const { setSearch } = useContext(ComedianContext)

    return (
        <>
        Comedian Search:
        <input type="text"
        className="search--comedian"
        onKeyUp={
            (keyIn) => setSearch(keyIn.target.value)
        }
        placeholder="Filter comedian by name" />
        </>
    )
}