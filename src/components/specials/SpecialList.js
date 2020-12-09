import React, { useContext, useEffect } from "react"
import { SpecialContext } from "./SpecialProvider"
import { Special } from "./SpecialProvider"
import { Link } from "react-router-dom"
import "./Special.css"

/* add props as a parameter because you're passing a property 
object to the special
*/
export const SpecialList = (props) => {
    //this state changes when getSpecials is invoked
    const { specials, getSpecials } = useContext(SpecialContext)

    /* Component is mounted to the DOM, React renders
    blank HTML first, gets data, then re-renders
    */
   useEffect(() => {
       getSpecials()
   }, [])

   return (
       <div className="specials">
           <h1>Specials</h1>
           <button onClick={() => props.history.push("specials/create")}>
               Add Special
           </button>
           <article className="specialList">
               {specials.map(special => {
                   return <Link key={special.id} to={`/specials/${special.id}`}>
                       <h3>{special.name}</h3>
                   </Link>
               })}
           </article>
       </div>
   )
}