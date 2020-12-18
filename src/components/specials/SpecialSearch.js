import React, { useContext } from "react"
import { SpecialContext } from "./SpecialProvider"
import "./Special.css"

export const SpecialSearch = (props) => {
    const { setSearch } = useContext(SpecialContext)

    return (
        <>
        Special Search: 
        <input type="text"
        className="search--special"
        onKeyUp={
            (keyEvent) => setSearch(keyEvent.target.value)
        }
        placeholder="Filter special names" />
        </>
    )
}