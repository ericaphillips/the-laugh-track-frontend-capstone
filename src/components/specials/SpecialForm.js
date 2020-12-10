import React, { useContext, useRef, useEffect } from "react"
import { SpecialContext } from "./SpecialProvider"
import { SpecialGenreContext } from "../SpecialDropdowns/SpecialGenreProvider"
import { SpecialLengthContext } from "../SpecialDropdowns/SpecialLengthProvider"
import { SpecialPlatformContext } from "../SpecialDropdowns/SpecialPlatformProvider"
import "./Special.css"

export const SpecialForm = (props) => {
    const { addSpecial } = useContext(SpecialContext)
    const { specialGenres, getSpecialGenres } = useContext(SpecialGenreContext)
    const { specialLengths, getSpecialLengths } = useContext(SpecialLengthContext)
    const { specialPlatforms, getSpecialPlatforms } = useContext(SpecialPlatformContext)

    /* Creates references that can be attached to the input fields
    in the form. Allows you to get the value of the input fields 
    when user clicks the save button
    */
   const name = useRef(null)
   const comicName = useRef(null)
   const rating = useRef(null)
   const specialLength = useRef(null)
   const specialPlatform = useRef(null)
   const cost = useRef(null)
   const clean = useRef(null)
   const comments = useRef(null)
   const specialGenre = useRef(null)
   
   //get Special dropdown states on initialization
   useEffect(() => {
       getSpecialLengths()
        getSpecialPlatforms()
        getSpecialGenres()
   }, [])

   const addNewSpecial = () => {
       const specialLengthId = parseInt(specialLength.current.value)
        const specialPlatformId = parseInt(specialPlatform.current.value)
        const specialGenreId = parseInt(specialGenre.current.value)
        
       if (specialLengthId === 0) {
           window.alert("Please select a length for this special")
       }
       if (specialPlatformId === 0) {
           window.alert("Please select a platform for this special")
       }
       else {
           addSpecial({
               name: name.current.value,
               comicName: comicName.current.value,
               rating: rating.current.value,
               specialLengthId,
               specialPlatformId,
               cost: cost.current.value,
               clean: clean.current.value,
               comments: comments.current.value,
               specialGenreId,
               userId: parseInt(localStorage.getItem("app_user_id"))
           })
           .then(() => props.history.push("/specials"))
       }
   }

   return (
       <form className="specialForm">
           <h2 className="specialForm__title">Add Special</h2>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="name">Special name: </label>
                   <input type="text" id="name" ref={name} required autoFocus className="form-control" placeholder="Special name" />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="comicName">Comedian's name: </label>
                   <input type="text" id="comicName" ref={comicName} required autoFocus className="form-control" placeholder="Comedian's name" />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="rating">Your rating: </label>
                   <select defaultValue="" name="rating" ref={rating} id="userRating" className="form-control">
                    <option value="0">Select your rating of this special</option>
                    </select>
               </div>
            </fieldset>
            <fieldset>
               <div className="form-section">
                   <label htmlFor="specialLength">Special's Length: </label>
                   <select defaultValue="" name="length" ref={specialLength} id="specialLengthId" className="form-control" >
                       <option value="0">Special's Approximate Length</option>
                       {specialLengths.map(length => (
                           <option key={length.id} value={length.id}>
                               {length.length}
                           </option>
                       ))}
                   </select>
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="specialPlatform">Special's Platform: </label>
                   <select defaultValue="" name="platform" ref={specialPlatform} id="specialPlatformId" className="form-control" >
                       <option value="0">Special's Platform</option>
                       {specialPlatforms.map(platform => (
                           <option key={platform.id} value={platform.id}>
                               {platform.platform}
                           </option>
                       ))}
                   </select>
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="cost">Special's cost: </label>
                   <input type="text" id="cost" ref={cost} required autoFocus className="form-control" placeholder="Special's cost" />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="specialGenre">Special's Genre: </label>
                   <select defaultValue="" name="genre" ref={specialGenre} id="specialGenreId" className="form-control" >
                       <option value="0">Special's Genre</option>
                       {specialGenres.map(genre => (
                           <option key={genre.id} value={genre.id}>
                               {genre.genre}
                           </option>
                       ))}
                   </select>
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="rating">Is the special clean? </label>
                   <select defaultValue="" name="clean" ref={clean} id="specialClean" className="form-control">
                    <option value="0">Clean?</option>
                    </select>
               </div>
            </fieldset>
            <fieldset>
               <div className="form-section">
                   <label htmlFor="comments">Your comments and additional information: </label>
                   <textarea name="comments" id="comments" ref={comments} required autoFocus className="form-control" placeholder="Comments" />
               </div>
           </fieldset>
           <button type="submit"
           onClick={event => {
               event.preventDefault()
                addNewSpecial()
           }}
           className="button button-submit">
               Add Special
           </button>
       </form>
   )
}