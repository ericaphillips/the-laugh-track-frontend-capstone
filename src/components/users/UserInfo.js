import React from "react"

export const UserInfo = ({ user }) => (
    <section className="user">
        <h2 className="user__name">{user.name}</h2>
        <div className="user__description">{user.description}</div>
    </section>
)