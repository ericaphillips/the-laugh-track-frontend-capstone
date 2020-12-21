import React, { useContext, useEffect, useState } from "react"
import { SpecialContext } from "./SpecialProvider"
import { Special } from "./Special"
import "./Special.css"
import { UserContext } from "../users/UserProvider"

/* add props as a parameter because you're passing a property 
object to the special
*/
export const SpecialList = (props) => {
    //this state changes when getSpecials is invoked
    const { specials, getSpecials, deleteSpecial, searchTerms } = useContext(SpecialContext)
    const { users, getUsers } = useContext(UserContext)

    const currentUser = parseInt(localStorage.getItem("app_user_id"))

    //Since no longer displaying all specials
    const [ filteredSpecials, setFiltered ] = useState([])

    /* Component is mounted to the DOM, React renders
    blank HTML first, gets data, then re-renders
    */
   useEffect(() => {
    getUsers()   
    .then(getSpecials)
   }, [])

   useEffect (() => {
       if (searchTerms !== "") {
       //if search field isn't blank, show searched specials
       const filtered = specials.filter(special => special.name.toLowerCase().includes(searchTerms))
       setFiltered(filtered)
   } else {
       //if search field is empty
       setFiltered(specials)
   }
}, [searchTerms, specials])

   return (
       <div className="specials">
           <h1>Specials</h1>
           <button onClick={() => props.history.push("specials/createNewSpecial")}>
               Add Special
           </button>
           <article className="specialList">
               {
               filteredSpecials.map(special => {
               const user= users.find(user => user.id === special.userId)
               return (
               <section className="specialListTwo" key={special.id}>
               <Special special={special} user={user} />
                
                <button onClick={() => {
                props.history.push(`/specials/${special.id}`)
                }}>View Special's Details</button>
                
                {/*Button only shows if the currently logged in user entered the special*/}
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
               )})
            }
           </article>
       </div>
   )
}