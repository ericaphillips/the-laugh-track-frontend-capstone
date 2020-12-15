import React, { useContext, useEffect, useState } from "react"
import { SpecialContext } from "../specials/SpecialProvider"
import { ComedianContext } from "../FavoriteComedians/ComedianProvider"
import { UserContext } from "./UserProvider"
import { Special } from "../specials/Special"
import { Comedian } from "../FavoriteComedians/Comedian"

export const UserPage = (props) => {
    const { specials, getSpecials, deleteSpecial, changeSpecial } = useContext(SpecialContext)
    const { comedians, getComedians, deleteComedian, changeComedian } = useContext(ComedianContext)
    const { users, getUsers } = useContext(UserContext)

    const [ user, setUser ] = useState([])
    const [ userSpecials, setUserSpecials ] = useState([])
    const [ userComedians, setUserComedians ] = useState([]) 

    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    useEffect(() => {
        getUsers()
        .then(getComedians)
        .then(getSpecials)
    }, [])

    useEffect (() => {
        const user = users.find(user => user.id === parseInt(props.match.params.userId)) || {}
        setUser(user)
    }, [users])

    useEffect (() => {
        const userSpecials = specials.filter(specials => specials.userId === parseInt(props.match.params.userId)) || {}
        setUserSpecials(userSpecials)
    }, [userSpecials])  

    useEffect (() => {
        const userComedians = comedians.filter(comedians => comedians.userId === parseInt(props.match.params.userId)) || {}
        setUserComedians(userComedians)
    }, [userComedians])

    return (
        <>
        <section className="users__specials">
        <h1>{user.name}'s Watched Specials</h1>
        <div className="user__Specials">
            {
                userSpecials.map(special => {
                    return (
                    <>
                    <Special key={special.id} special={special} user={user} />
                    {currentUser === parseInt(special.userId)  && 
               <button className="btn--release"
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
                    </>
                    )
                   
                })
            }
        </div>
        {currentUser === parseInt(props.match.params.userId)  && 
        <button onClick={() => props.history.push("/specials/createNewSpecial")}>
               Add Special
           </button>
        }
        </section>
        <section className="users__comedians">
            <h1>{user.name}'s Favorite Comedians</h1>
            <div className="user__Comedians">
                {
                    userComedians.map(comedian => {
                        return (
                        <>
                        <Comedian key={comedian.id} comedian={comedian} user={user} />
                        {currentUser === parseInt(comedian.userId)  && 
                        <button className="btn--release"
                        onClick={
                        () => {
                            deleteComedian(comedian.id)
                            .then(() => {
                            props.history.push("/comedians")
                            })
                        }
                        }>
                        Delete Comedian
                        </button>
                    }
                        </>
                        )
                    })
                }
            </div>
            {currentUser === parseInt(props.match.params.userId)  &&         
            <button onClick={() => props.history.push("/comedians/createNewComedian")}>
                Add a Favorite Comedian
            </button>
            }
        </section>
        </>
    )
    
}