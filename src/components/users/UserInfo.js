import React from "react"

//shows user info on part of a user's page
export const UserInfo = ({ user }) => (
    <section className="user">
        <div className="user__description">{user.description}</div>
    </section>
)