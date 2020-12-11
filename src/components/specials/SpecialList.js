import React, { useContext, useEffect } from "react"
import { SpecialContext } from "./SpecialProvider"
import { Special } from "./Special"
import { Link } from "react-router-dom"
import "./Special.css"
import { UserContext } from "../users/UserProvider"

/* add props as a parameter because you're passing a property 
object to the special
*/
export const SpecialList = (props) => {
    //this state changes when getSpecials is invoked
    const { specials, getSpecials } = useContext(SpecialContext)
    const { users, getUsers } = useContext(UserContext)

    /* Component is mounted to the DOM, React renders
    blank HTML first, gets data, then re-renders
    */
   useEffect(() => {
    getUsers()   
    .then(getSpecials)
   }, [])

   return (
       <div className="specials">
           <h1>Specials</h1>
           <button onClick={() => props.history.push("specials/create")}>
               Add Special
           </button>
           <article className="specialList">
               {
               specials.map(special => {
               const user= users.find(user => user.id === special.userId)
               return <Special key={special.id} special={special} user={user} />
               })
            }
           </article>
       </div>
   )
}