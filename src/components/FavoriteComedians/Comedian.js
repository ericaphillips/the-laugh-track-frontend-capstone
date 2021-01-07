//HTML representation of Comedians, used in ComedianList and UserPage
import React from "react"
import "./Comedian.css"
import { Link } from "react-router-dom"


export const Comedian = ({ comedian, user }) => (
    <section className="comedian">
        <h3 className="comedian__name">
            {comedian.name}
        </h3>
        <div className="comedian__comments">Comments by <Link to={`/users/${user.id}`}>{user.name}</Link>: {comedian.comments}</div>
    </section>
)