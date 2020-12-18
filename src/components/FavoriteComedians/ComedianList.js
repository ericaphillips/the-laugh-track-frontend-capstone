//List of comedians. Renders on /comedians and on a user's page, but only the comedian's they've entered
import React, { useContext, useEffect, useState } from "react"
import { ComedianContext } from "./ComedianProvider"
import { Comedian } from "./Comedian"
import "./Comedian.css"
import { UserContext } from "../users/UserProvider"

/*
add props as a parameter because you're passing
a property object to the comedian
*/

export const ComedianList = (props) => {
    const { comedians, getComedians, deleteComedian, searchTerms } = useContext(ComedianContext)
    const { users, getUsers } = useContext(UserContext)

    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    //since no longer displaying all comedians
    const [ filteredComedians, setFiltered ] = useState([])

    /* Component is mounted to the DOM,
    react renders blank HTML first,
    then re-renders
    */

    useEffect(() => {
        getUsers()
        .then(getComedians)
    }, [])

    useEffect (() => {
        if (searchTerms !== "") {
        //if search field isn't blank, show searched specials
        const filtered = comedians.filter(comedian => comedian.name.toLowerCase().includes(searchTerms))
        setFiltered(filtered)
    } else {
        //if search field is empty
        setFiltered(comedians)
    }
 }, [searchTerms, comedians])

    return (
        <div className="comedians">
            <h1>Comedians</h1>
            <button onClick={() => props.history.push("/comedians/createNewComedian")}>
                Add a Favorite Comedian
            </button>
            <article className="comedianList">
                {
                    filteredComedians.map(comedian => {
                        const user= users.find(user => user.id === comedian.userId)
                        return (
                            <>
                        <Comedian key={comedian.id} comedian={comedian} user={user} />
                        
                        <button onClick={() => {
                        props.history.push(`/comedians/${comedian.id}`)
                        }}>View Comedian's Details</button>
                        
                        {/*Button only shows if the currently logged in user entered the comedian*/}
                        {currentUser === parseInt(comedian.userId)  && 
                        <button className="btn--release"
                        onClick={
                        () => {
                            deleteComedian(comedian.id)
                            .then(() => {
                            props.history.push("/comedians")
                            })
                        }
                        }>
                        Delete Comedian
                        </button>
                    }
            </>
                    )})
                }
            </article>
        </div>
    )

}