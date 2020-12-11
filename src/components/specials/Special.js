import React from "react"
import "./Special.css"
import { Link } from "react-router-dom"

export const Special = ({ special }) => {
    <section className="special">
        <h4 className="special__name">
            <Link to={`specials/${special.id}`}>
                { special.name }
            </Link>
        </h4>
        <div className="special__comic">{special.comicName}</div>
        <div className="special__user">Entered by: {special.userId}</div>
    </section>
}