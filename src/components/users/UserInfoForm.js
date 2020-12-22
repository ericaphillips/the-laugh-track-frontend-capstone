import React, { useContext, useEffect, useState} from "react"
import { UserContext } from "./UserProvider"
import { useForm } from "react-hook-form"

export const UserForm = (props) => {
    const { register, handleSubmit } = useForm()
    const { addProfPic, addDescription, users, getUsers } = useContext(UserContext)

    const [user, setUser] = useState({})
    
    useEffect(() => {
        getUsers()
    }, [])
    
    useEffect (() => {
        const foundUser = users.find(user => user.id === parseInt(props.match.params.userId)) || {}
        setUser(foundUser)
    }, [users])
    
    const submitImage = (data) => {
            const name = data.profPic[0].name
            const userId = user.id 
        console.log("data", data.profPic[0].name)
        console.log("user id", userId)
        addProfPic(userId, {profPic: name})
    }

    const submitDescription = (data) => {
        const name = data.description
        const userId = user.id
        console.log("data desc", data.description)
        addDescription(userId, {description: name})
    }

    return (
        <>
        <form onSubmit={handleSubmit(submitImage)}>
            <input ref={register} type="file" name="profPic" />
            <button 
            // className=" btn--add"
            //     onClick={() => {
            //         addProfPic(user.id)
            //         .then(() => {
            //             props.history.push(`/users/${user.id}`)
            //         })
            //     }

            //     }
            >Upload Picture</button>
        </form>
        <form onSubmit={handleSubmit(submitDescription)}>
            <label htmlFor="user__description">Add Description</label>
            <input type="text" name="description" ref={register} />
            <input type="submit" />
            {/* <button>Save Description</button> */}
        </form>
        </>
    )
}