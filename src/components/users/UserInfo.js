import React from "react"

export const UserInfo = ({ user }) => (
    <section className="user">
        <div className="user__description">{user.description}</div>
    </section>
)