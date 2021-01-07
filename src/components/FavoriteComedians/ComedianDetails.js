/* Details for one comedian. Comedian is routed from by clicking on their name 
on a list of comedians, either the general comedian list or on a user's page
*/
import React, { useState, useEffect, useContext } from "react"
import { ComedianContext } from "./ComedianProvider"
import { UserContext } from "../users/UserProvider"


export const ComedianDetails = (props) => {
    //gets what is needed from providers in order to render useful details about specials
    const { comedians, getComedians, deleteComedian } = useContext(ComedianContext)
    const { users, getUsers } = useContext(UserContext)
    
    //set state
    const [comedian, setComedian] = useState({})
    const [user, setUser] = useState({})

    //defines current user, used for user-specific data
    const currentUser = parseInt(localStorage.getItem("app_user_id"))
    
    //gets comedians and users from database
    useEffect(() => {
        getComedians()
        .then(getUsers)
    }, [])

    useEffect (() => {
        //finds the user associated with the comedian
        const user = users.find(user => user.id === comedian.userId) || {}
        setUser(user)
    }, [users])

    useEffect (() => {
        //finds the comedian based on the comedianId from the Route
        const comedian = comedians.find(comedian => comedian.id === parseInt(props.match.params.comedianId)) || {}
        setComedian(comedian)
    }, [comedians])

    return (
        <section className="comedian__details">
            <h3 className="comedian__name">{comedian.name}</h3>
            <div className="comedian__watched"><b>{user.name}'s Watched List:</b> {comedian.watched}</div>
            <div className="comedian__toWatch"><b>{user.name}'s To Watch List:</b> {comedian.toWatch}</div>
            <div className="comedian__podcast"><b>Does this comedian have a podcast?:</b> {comedian.podcast}</div>
            <div className="comedian__comments"><b>{user.name}'s Comments: </b>{comedian.comments}</div>

    {/*Buttons only show if the currently logged in user entered the comedian*/}
    {currentUser === parseInt(comedian.userId)  && 
            <button class="button--details" onClick={() => {
                props.history.push(`/comedians/edit/${comedian.id}`)
            }}>Edit Comedian's Details</button>
        }
        
    {currentUser === parseInt(comedian.userId)  && 
            <button className="button--deleteComedian"
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

        </section>
    )
}