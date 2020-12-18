import React, { useContext } from "react"
import { UserContext } from "../users/UserProvider"

export const SpecialsDropdown = (props) => {
    const { setUsersRatingAsc } = useContext(UserContext)
    
    return (
        <>
        
        <form className="specialDropdown">
            <div className="specialDropdown__header">Sort specials:</div>
            <fieldset>
                <div className="specialDropdown__options">
                <select name="sort__special" className="form-control" id="sort--special">
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