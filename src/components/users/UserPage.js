//User's page displaying their user info, favorite comedians, and specials they've watched
import React, { useContext, useEffect, useState } from "react"
import { SpecialContext } from "../specials/SpecialProvider"
import { ComedianContext } from "../FavoriteComedians/ComedianProvider"
import { UserContext } from "./UserProvider"
import { Special } from "../specials/Special"
import { Comedian } from "../FavoriteComedians/Comedian"
import { UserInfo } from "./UserInfo"
import { SpecialsDropdown } from "../SortingDropdowns/SpecialSort"
import { ComediansDropdown } from "../SortingDropdowns/ComedianSort"
import "./User.css"

/* add props as a parameter because you're passing property 
objects
*/
export const UserPage = (props) => {
    //context providers for data
    const { specials, getSpecials, deleteSpecial} = useContext(SpecialContext)
    const { comedians, getComedians, deleteComedian} = useContext(ComedianContext)
    const { users, getUsers} = useContext(UserContext)

    //sets state
    const [ user, setUser ] = useState([])
    const [ userSpecials, setUserSpecials ] = useState([])
    const [ userComedians, setUserComedians ] = useState([]) 
    
    //defines current user, used for user-specific data
    const currentUser = parseInt(localStorage.getItem("app_user_id"))
    // const [ filteredSpecials, setFiltered ] = useState([])

    /* Component is mounted to the DOM, React renders
    blank HTML first, gets data, then re-renders
    */
    useEffect(() => {
        getUsers()
        .then(getComedians)
        .then(getSpecials)
    }, [])

    //defines user for this page based on userId from Route
    useEffect (() => {
        const user = users.find(user => user.id === parseInt(props.match.params.userId)) || {}
        setUser(user)
    }, [users, props.match.params.userId])

    //finds specials for the userId from Route
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

    //finds comedians for the userId from the Route
    useEffect (() => {
        const userComedians = comedians.filter(comedians => comedians.userId === parseInt(props.match.params.userId)) || {}
        setUserComedians(userComedians)
    }, [comedians, props.match.params.userId])

/*returns a button to edit user info if current user is the same as the userId for the page, 
a filtered list of specials based on the user, a filtered list of comedians based on the user, 
and if the current user is the user whose page it is, also renders add and delete buttons
Always renders veiw details buttons regardless of who current user is
*/
    return (
        <>
        

        <section className="users__page">
        <section className="users__info">
            <h1>About {user.name}</h1>
            <div className="user__Info">
                <UserInfo key={user.id} user={user} />
            </div>
        </section>
        <section className="users__specials">
        <h1>{user.name}'s Watched Specials</h1>
        <SpecialsDropdown />

        <div className="user__Specials">
            {
                userSpecials.map(special => {
                    return (
                    <section className="userSpecialList" key={special.id}>
                    <Special special={special} user={user} />
                    <button class="button--specialDetails" onClick={() => {
                        props.history.push(`/specials/${special.id}`)
                        }}>View Special's Details</button>
                    {currentUser === parseInt(special.userId)  && 
               <button className="deleteSpecial"
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
        <button className="button--addSpecial" onClick={() => props.history.push("/specials/createNewSpecial")}>
               Add Special
           </button>
        }
        </section>
        <section className="users__comedians">
            <h1>{user.name}'s Favorite Comedians</h1>
            <ComediansDropdown />
            <div className="user__Comedians">
                {
                    userComedians.map(comedian => {
                        return (
                        <section className="userComedianList" key={comedian.id}>
                        <Comedian comedian={comedian} user={user} />
                        <button class="button--comedianDetails" onClick={() => {
                        props.history.push(`/comedians/${comedian.id}`)
                        }}>View Comedian's Details</button>
                        {currentUser === parseInt(comedian.userId)  && 
                        <button className="deleteComedian"
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
            <button class="button--addComedian" onClick={() => props.history.push("/comedians/createNewComedian")}>
                Add a Favorite Comedian
            </button>
            }
        </section>
        </section>
        {currentUser === parseInt(props.match.params.userId)  && 
         <button class="edit--user" onClick={() => props.history.push(`/users/edit/${currentUser}`)}>
              Edit User
           </button>
        }
        </>
    )
    
}