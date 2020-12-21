import React, { useContext, useEffect, useState } from "react"
import { SpecialContext } from "../specials/SpecialProvider"
import { ComedianContext } from "../FavoriteComedians/ComedianProvider"
import { UserContext } from "./UserProvider"
import { Special } from "../specials/Special"
import { Comedian } from "../FavoriteComedians/Comedian"
import { UserInfo } from "./UserInfo"
import { SpecialsDropdown } from "../SortingDropdowns/SpecialSort"
import "./User.css"
// import "../FavoriteComedians/Comedian.css"
// import "../specials/Special.css"


export const UserPage = (props) => {
    const { specials, getSpecials, deleteSpecial, searchTerms, sortSpecialsNumAsc, sortSpecialsNumDesc } = useContext(SpecialContext)
    const { comedians, getComedians, deleteComedian, changeComedian } = useContext(ComedianContext)
    const { users, getUsers, usersRatingAsc, setUsersRatingAsc } = useContext(UserContext)

    const [ user, setUser ] = useState([])
    const [ userSpecials, setUserSpecials ] = useState([])
    const [ userComedians, setUserComedians ] = useState([]) 
    
    

    const currentUser = parseInt(localStorage.getItem("app_user_id"))
    // const [ filteredSpecials, setFiltered ] = useState([])


    useEffect(() => {
        getUsers()
        .then(getComedians)
        .then(getSpecials)
    }, [])

    useEffect (() => {
        const user = users.find(user => user.id === parseInt(props.match.params.userId)) || {}
        setUser(user)
    }, [users, props.match.params.userId])

    useEffect (() => {
        const userSpecials = specials.filter(specials => specials.userId === parseInt(props.match.params.userId)) || {}
        setUserSpecials(userSpecials)
    }, [specials, props.match.params.userId])  

//     useEffect (() => {
//         if (searchTerms !== "") {
//         //if search field isn't blank, show searched specials
//         const filtered = userSpecials.filter(special => special.name.toLowerCase().includes(searchTerms))
//         setFiltered(filtered)
//     } else {
//         //if search field is empty
//         setFiltered(userSpecials)
//     }
//  }, [searchTerms, specials])

    useEffect (() => {
        const userComedians = comedians.filter(comedians => comedians.userId === parseInt(props.match.params.userId)) || {}
        setUserComedians(userComedians)
    }, [comedians, props.match.params.userId])

    return (
        <>
        {currentUser === parseInt(props.match.params.userId)  && 
         <button onClick={() => props.history.push(`/users/edit/${currentUser}`)}>
              Edit User
           </button>
        }

        <section className="users__page">
        <section className="users__info">
            <h1>About {user.name}</h1>
            <div className="user__Info">
                <UserInfo key={user.id} user={user} />
            </div>
        </section>
        <section className="users__specials">
        <h1>{user.name}'s Watched Specials</h1>
        <SpecialsDropdown key={1}/>
        {/* <form className="specialDropdown">
            <div className="specialDropdown__header">Sort by:</div>
            <fieldset>
                <div className="specialDropdown__options">
                <select name="sort__special" className="form-control">
                    <option value="0">Sort By:</option>
                    <option value="Rating Ascending" onSelect={event => {
                        event.preventDefault()
                        SortSpecialsByNumAsc()}}>Rating Ascending</option>
                    <option value="Rating Descending">Rating Descending</option>
                    </select>
                        <button type="submit" 
                        onClick={event => {
                        event.preventDefault()
                        SortSpecialsByNumAsc()}}>Sort</button>
                </div>
            </fieldset>
        </form> */}
        <div className="user__Specials">
            {
                userSpecials.map(special => {
                    return (
                    <section className="userSpecialList" key={special.id}>
                    <Special special={special} user={user} />
                    <button onClick={() => {
                        props.history.push(`/specials/${special.id}`)
                        }}>View Special's Details</button>
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
                    </section>
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
            <div className="users__comedians">
                {
                    userComedians.map(comedian => {
                        return (
                        <section className="userComedianList" key={comedian.id}>
                        <Comedian comedian={comedian} user={user} />
                        <button onClick={() => {
                        props.history.push(`/comedians/${comedian.id}`)
                        }}>View Comedian's Details</button>
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
                        </section>
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
        </section>
        </>
    )
    
}