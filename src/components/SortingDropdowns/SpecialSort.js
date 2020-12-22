import React, { useContext } from "react"
import { UserContext } from "../users/UserProvider"
import { SpecialContext } from "../specials/SpecialProvider"

export const SpecialsDropdown = (props) => {
    // const { setUsersRatingAsc } = useContext(UserContext)
    const { specials, setSpecials } = useContext(SpecialContext)

    const handleSort = (event) => {
        const specialsToSort = [...specials]
        if (event.target.value === "special--ratingascending") {
        const sortedSpecials = specialsToSort.sort((a, b) => a.rating - b.rating)
        setSpecials(sortedSpecials)
        }
        if (event.target.value === "special--ratingdescending") {
            const sortedSpecials = specialsToSort.sort((a, b) => b.rating - a.rating)
            setSpecials(sortedSpecials)
            }
        if (event.target.value === "special--name") {
            const sortedSpecials = specialsToSort.sort((a, b) => {
                var nameA = a.name.toUpperCase()
                var nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
            return 1
            }
            if (nameA = nameB) {
                return 0
            }
        })
        setSpecials(sortedSpecials)
            }
        if (event.target.value === "special--comedian") {
            const sortedSpecials = specialsToSort.sort((a, b) => {
                var nameA = a.comicName.toUpperCase()
                var nameB = b.comicName.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            if (nameA = nameB) {
                return 0
            }
            })
            setSpecials(sortedSpecials)
            }
        if (event.target.value === "special--runtime") {
            const sortedSpecials = specialsToSort.sort((a, b) => a.specialLengthId - b.specialLengthId)
            setSpecials(sortedSpecials)
            }
        if (event.target.value === "special--platform") {
            const sortedSpecials = specialsToSort.sort((a, b) => a.specialPlatformId - b.specialPlatformId)
            setSpecials(sortedSpecials)
            }
        if (event.target.value === "special--entered") {
            const sortedSpecials = specialsToSort.sort((a, b) => a.id - b.id)
            setSpecials(sortedSpecials)
            }
    }
    
    return (
        <>
        
        <form className="specialDropdown">
            <div className="specialDropdown__header">Sort specials:</div>
            <fieldset>
                <div className="specialDropdown__options">
                <select name="sort__special" className="form-control" id="sort--special" onChange={handleSort}>
                    <option value="0">Sort By</option>
                    {/* <option value="Rating Ascending" onSelect={event => {
                        event.preventDefault()
                        SortSpecialsByNumAsc()}}>Rating Ascending</option> */}
                    <option value="special--ratingascending">Rating Low-High</option>
                    <option value="special--ratingdescending">Rating High-Low</option>
                    <option value="special--name">Special's Name A-Z</option>
                    <option value="special--comedian">Special's Comedian's Name A-Z</option>
                    <option value="special--runtime">Special's Runtime</option>
                    <option value="special--platform">Special's Streaming Platform</option>
                    <option value="special--entered">Date Entered</option>
                    </select>
                        {/* <button type="submit" 
                        onClick={event => {
                        event.preventDefault()
                        SortSpecialsByNumAsc()}}>Sort</button> */}
                </div>
            </fieldset>
        </form>
        </>
    )
}