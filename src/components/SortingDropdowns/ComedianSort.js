//used on Comedian List and user's pages to sort lists of comedians
import React, { useContext } from "react"
import { ComedianContext } from "../FavoriteComedians/ComedianProvider"

export const ComediansDropdown = (props) => {
    const { comedians, setComedians } = useContext(ComedianContext)

    //sorts list differently based on target value of what option was selected from dropdown
    const handleSort = (event) => {
        const comediansToSort = [...comedians]

        if (event.target.value === "comedian--nameAsc") {
            const sortedComedians = comediansToSort.sort((a, b) => {
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
        setComedians(sortedComedians)
    }
        if (event.target.value === "comedian--nameDesc") {
            const sortedComedians = comediansToSort.sort((a, b) => {
                var nameA = a.name.toUpperCase()
                var nameB = b.name.toUpperCase()
            if (nameA < nameB) {
                return 1
            }
            if (nameA > nameB) {
            return -1
            }
            if (nameA = nameB) {
                return 0
            }
        })
        setComedians(sortedComedians)
        }
        if (event.target.value === "comedian--entered") {
            const sortedComedians = comediansToSort.sort((a, b) => a.id - b.id)
            setComedians(sortedComedians)
            }

    }

    //dropdown used with values to sort by
    return (
        <>
        
        <form className="comedianDropdown">
            <div className="comedianDropdown__header">Sort comedians:</div>
            <fieldset>
                <div className="comedianDropdown__options">
                <select name="sort__comedian" className="form-control" id="sort--comedian" onChange={handleSort}>
                    <option value="0">Sort By</option>
                    <option value="comedian--nameAsc">Comedian's Name A-Z</option>
                    <option value="comedian--nameDesc">Comedian's Name Z-A</option>
                    <option value="comedian--entered">Date Entered</option>
                    </select>
                </div>
            </fieldset>
        </form>
        </>
    )
}