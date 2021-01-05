//List of specials. Renders on /specials and on a user's page, but only the specials they've entered
import React, { useContext, useEffect, useState } from "react"
import { SpecialContext } from "./SpecialProvider"
import { Special } from "./Special"
import "./Special.css"
import { UserContext } from "../users/UserProvider"
import { SpecialsDropdown } from "../SortingDropdowns/SpecialSort"
import { SpecialSearch } from "./SpecialSearch"

/* add props as a parameter because you're passing a property 
object to the special
*/
export const SpecialList = (props) => {
    //context providers for data
    const { specials, getSpecials, deleteSpecial, searchTerms } = useContext(SpecialContext)
    const { users, getUsers } = useContext(UserContext)

    // const specialsToSearch = [...specials]

    //defines current user, used for user-specific data
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

/*returns a button to add a special, a filtered list of specials based on search,
and if the current user is the user who entered the special, renders a button to delete the special
*/
   return (
       <div className="specials">
           <h1>Specials</h1>
           <div className="topOfPage">
           <button className="button--addSpecial" onClick={() => props.history.push("specials/createNewSpecial")}>
               Add Special
           </button>
           <SpecialSearch />
           <SpecialsDropdown />
           </div>
           <article className="specialList">
               {
               filteredSpecials.map(special => {
               const user= users.find(user => user.id === special.userId)
               return (
               <section className="specialListTwo" key={special.id}>
                   
               <Special special={special} user={user} />
                <br />
                <button className="button--specialDetails" onClick={() => {
                props.history.push(`/specials/${special.id}`)
                }}>View Special's Details</button>
                
                {/*Button only shows if the currently logged in user entered the special*/}
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
               )})
            }
           </article>
       </div>
   )
}