import React, { useContext, useEffect } from "react"
import { ComedianContext } from "./ComedianProvider"
import { Comedian } from "./Comedian"
import "./Comedian.css"
import { UserContext } from "../users/UserProvider"

//add props as a parameter because you're passing
//a property object to the comedian

export const ComedianList = (props) => {
    //this state changes when getComedians is invoked
    const { comedians, getComedians } = useContext(ComedianContext)
    const { users, getUsers } = useContext(UserContext)

    /* Component is mounted to the DOM,
    react renders blank HTML first,
    then re-renders
    */

    useEffect(() => {
        getUsers()
        .then(getComedians)
    }, [])

    return (
        <div className="comedians">
            <h1>Comedians</h1>
            <button onClick={() => props.history.push("comedians/createNewComedian")}>
                Add a Favorite Comedian
            </button>
            <article className="comedianList">
                {
                    comedians.map(comedian => {
                        const user= users.find(user => user.id === comedian.userId)
                        return <Comedian key={comedian.id} comedian={comedian} user={user} />
                    })
                }
            </article>
        </div>
    )

}