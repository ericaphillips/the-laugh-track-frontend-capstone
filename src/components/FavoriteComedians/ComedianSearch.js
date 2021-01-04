import React, { useContext } from "react"
import { ComedianContext } from "./ComedianProvider"
import "./Comedian.css"

export const ComedianSearch = (props) => {
    const { setSearch } = useContext(ComedianContext)

    return (
        <div className="comedian--search">
        Comedian Search:
        <br />
        <input type="text"
        className="search--comedian"
        onKeyUp={
            (keyIn) => setSearch(keyIn.target.value)
        }
        placeholder="Filter comedian by name" />
        </div>
    )
}