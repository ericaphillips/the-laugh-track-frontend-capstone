import React from "react"
import "./Special.css"
import { Link } from "react-router-dom"

export const Special = ({ special, user }) => (
    <section className="special">
        <h4 className="special__name">
            <Link to={`/specials/${special.id}`}>
                { special.name }
            </Link>
        </h4>
        <div className="special__comic">Comedian: {special.comicName}</div>
        <div className="special__user">Entered by: <Link to={`/users/$user.id}`}>{user.name}</Link></div>
        <div className="special__rating">{user.name}'s rating: {special.rating}</div>
    </section>
)