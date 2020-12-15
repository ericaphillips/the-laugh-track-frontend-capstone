import React, { useState, useEffect, useContext } from "react"
import { ComedianContext } from "./ComedianProvider"
import { UserContext } from "../users/UserProvider"
import { Special } from "../specials/Special"

export const ComedianDetails = (props) => {
    const { comedians, getComedians } = useContext(ComedianContext)
    const { users, getUsers } = useContext(UserContext)
    
    const [comedian, setComedian] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        getComedians()
        .then(getUsers)
    }, [])

    useEffect (() => {
        const user = users.find(user => user.id === comedian.userId) || {}
        setUser(user)
    }, [users])

    useEffect (() => {
        const comedian = comedians.find(comedian => comedian.id === parseInt(props.match.params.comedianId)) || {}
        setComedian(comedian)
    }, [comedians])

    return (
        <section className="comedian">
            <h3 className="comedian__name">{comedian.name}</h3>
            <div className="comedian__watched">{user.name}'s Watched List: {comedian.watched}</div>
            <div className="comedian__toWatch">{user.name}'s To Watch List: {comedian.toWatch}</div>
            <div className="comedian__podcast">Does this comedian have a podcast? {comedian.podcast}</div>
            <div className="comedian__comments">{user.name}'s Comments: {comedian.comments}</div>
            <button onClick={() => {
                props.history.push(`/comedians/edit/${comedian.id}`)
            }}>Edit Comedian's Details</button>
        </section>
    )
}