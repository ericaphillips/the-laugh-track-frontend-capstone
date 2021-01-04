/* Details for one special. Special is routed from by clicking on their name 
on a list of specials, either the general special list or on a user's page
*/

import React, { useState, useEffect, useContext } from "react"
import { SpecialContext } from "./SpecialProvider"
import { SpecialGenreContext } from "../SpecialDropdowns/SpecialGenreProvider"
import { SpecialLengthContext } from "../SpecialDropdowns/SpecialLengthProvider"
import { SpecialPlatformContext } from "../SpecialDropdowns/SpecialPlatformProvider"
import { UserContext } from "../users/UserProvider"


export const SpecialDetails = (props) => {
    //gets what is needed from providers in order to render useful details about specials
    const { specials, getSpecials, deleteSpecial } = useContext(SpecialContext)
    const { specialGenres, getSpecialGenres } = useContext(SpecialGenreContext)
    const { specialLengths, getSpecialLengths } = useContext(SpecialLengthContext)
    const { specialPlatforms, getSpecialPlatforms } = useContext(SpecialPlatformContext)
    const { users, getUsers } = useContext(UserContext)

    //set initial state
    const [special, setSpecial] = useState({})
    const [specialGenre, setSpecialGenre] = useState({})
    const [specialLength, setSpecialLength] = useState({})
    const [specialPlatform, setSpecialPlatform] = useState({})
    const [user, setUser] = useState({})

    //defines current user, used for user-specific data
    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    //gets specials, the related tables for specials, and users from database
    useEffect(() => {
        getSpecials()
        .then(getSpecialGenres)
        .then(getSpecialLengths)
        .then(getSpecialPlatforms)
        .then(getUsers)
    }, [])

    //finds genre associated with each special
    useEffect (() => {
        const genre = specialGenres.find(genre => genre.id === special.specialGenreId) || {}
        setSpecialGenre(genre)
    }, [specialGenres])

    //finds length associated with each special
    useEffect (() => {
        const length = specialLengths.find(length => length.id === special.specialLengthId) || {}
        setSpecialLength(length)
    }, [specialLengths])

    //finds platform associated with each special
    useEffect (() => {
        const platform = specialPlatforms.find(platform => platform.id === special.specialPlatformId) || {}
        setSpecialPlatform(platform)
    }, [specialPlatforms])

    //finds user associated with each special
    useEffect (() => {
        const user = users.find(user => user.id === special.userId) || {}
        setUser(user)
    }, [users])

    //finds special based on specialId created in Application Views Route
    useEffect (() => {
        const special = specials.find(special => special.id === parseInt(props.match.params.specialId)) || {}
        setSpecial(special)
    }, [specials])

    return (
        <>
        <section className="special__details">
            <h3 className="special__name">{special.name}</h3>
            <div className="special__comic">Comedian: {special.comicName}</div>
            <div className="special__userRating">{user.name}'s Rating: {special.rating}</div>
            <div className="special__length">Special's Length: {specialLength.length}</div>
            <div className="special__platform">Streaming on: {specialPlatform.platform}</div>
            <div className="special__cost">Cost: {special.cost}</div>
            <div className="special__clean">Clean?: {special.clean}</div>
            <div className="special__comments">{user.name}'s Comments: {special.comments}</div>
            <div className="special__genre">Genre: {specialGenre.genre}</div>
            <div className="special__user">Input by: {user.name}</div>

        {/*Buttons only show if the currently logged in user entered the special*/}  
        {currentUser === parseInt(special.userId)  && 
            <button class="button--details" onClick={() => {
                props.history.push(`/specials/edit/${special.id}`)
            }}>Edit Special's Details</button>
        }

        {currentUser === parseInt(special.userId)  && 
            <button className="button--deleteSpecial"
            onClick={
                () => {
                    deleteSpecial(special.id)
                    .then(() => {
                        props.history.push("/specials")
                    })
                }
            }>
            Delete Special
            </button>
}
        </section>
        </>
    )
}