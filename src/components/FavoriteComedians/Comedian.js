import React from "react"
import "./Comedian.css"
import { Link } from "react-router-dom"

export const Comedian = ({ comedian }) => (
    <section className="comedian">
        <h4 className="comedian__name">
            <Link to={`comedians/${comedian.id}`}>
            {comedian.name}
            </Link>
        </h4>
    </section>
)