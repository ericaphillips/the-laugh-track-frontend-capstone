//HTML representation of Specialss, used in SpecialList and UserPage
import React, { useState, useEffect, useContext } from "react"
import "./Special.css"
import { Link } from "react-router-dom"
import { SpecialLengthContext } from "../SpecialDropdowns/SpecialLengthProvider"
import { SpecialPlatformContext } from "../SpecialDropdowns/SpecialPlatformProvider"

export const Special = ({ special, user }) => {
    //useContext to get special lengths and platforms from their providers
    const { specialLengths, getSpecialLengths } = useContext(SpecialLengthContext)
    const { specialPlatforms, getSpecialPlatforms } = useContext(SpecialPlatformContext)

    //set states of each
    const [specialLength, setSpecialLength] = useState({})
    const [specialPlatform, setSpecialPlatform] = useState({})

    //get special lengths and platforms from fetch call
    useEffect(() => {
        getSpecialLengths()
        .then(getSpecialPlatforms)
    }, [])

    //finds specific special lengths and platforms for each special based on ids
    useEffect (() => {
        const length = specialLengths.find(length => length.id === special.specialLengthId) || {}
        setSpecialLength(length)
    }, [specialLengths])

    useEffect (() => {
        const platform = specialPlatforms.find(platform => platform.id === special.specialPlatformId) || {}
        setSpecialPlatform(platform)
    }, [specialPlatforms])

    return (

    <section className="special">
        <h3 className="special__name">
                { special.name }
        </h3>
        <div className="special__comic">Comedian: {special.comicName}</div>
        <div className="special__user">Entered by: <Link to={`/users/${user.id}`}>{user.name}</Link></div>
        <div className="special__rating">{user.name}'s rating: {special.rating}</div>
        <div className="special__platform">Watch on: {specialPlatform.platform}</div>
        <div className="special__length">Length: {specialLength.length}</div>
    </section>
    )
}