import React, { useContext, useEffect, useState } from "react"
import { SpecialContext } from "./SpecialProvider"
import { SpecialGenreContext } from "../SpecialDropdowns/SpecialGenreProvider"
import { SpecialLengthContext } from "../SpecialDropdowns/SpecialLengthProvider"
import { SpecialPlatformContext } from "../SpecialDropdowns/SpecialPlatformProvider"
import "./Special.css"

export const SpecialForm = (props) => {
    //context providers for data
    const { addSpecial, changeSpecial, getSpecials, specials } = useContext(SpecialContext)
    const { specialGenres, getSpecialGenres } = useContext(SpecialGenreContext)
    const { specialLengths, getSpecialLengths } = useContext(SpecialLengthContext)
    const { specialPlatforms, getSpecialPlatforms } = useContext(SpecialPlatformContext)


    //component state
    const [special, setSpecial] = useState({})


    const specialLengthId = parseInt(special.specialLengthId)
    const specialPlatformId = parseInt(special.specialPlatformId)
    const specialGenreId = parseInt(special.specialGenreId)

    let cleanStatus = false
    const clean = (event) => {
        return cleanStatus = event.target.checked
    }
    const cleanStatusString = cleanStatus.toString()


        const ratingDropdowns = () => {
            const optionDropdownArray = [] 
            for (let i = 1; i <= 10; i++) {
                optionDropdownArray.push(<option key={i} value={i}>
                    {i}
                </option>)
        }
        return optionDropdownArray
    }
    //checks for URL parameter to see if special exists
    //to differentiate between editing and adding new
    const toEdit = props.match.params.hasOwnProperty("specialId")

    const handleSpecialEdit = (event) => {
        /* When changing a state object or array, create a new one
        and change state instead of modifying current one
        */
        const newSpecial = Object.assign({}, special)
        newSpecial[event.target.name] = event.target.value
        setSpecial(newSpecial)
    }

    /*
        If there's a specialId in the URL, the
        user wants to edit a special
        First, get the value of the specialId
        Second, use that id to find the special
        Then, update the component state variable
    */
   const getSpecialToEdit = () => {
       if (toEdit) {
           const specialId = parseInt(props.match.params.specialId)
           const selectedSpecial = specials.find(special => special.id === specialId) || {}
           setSpecial(selectedSpecial)
       }
   }

   
   //get Special dropdown states on initialization
   useEffect(() => {
       getSpecials()
       .then(getSpecialLengths)
        .then(getSpecialPlatforms)
        .then(getSpecialGenres)
   }, [])

   //Once the provider state is updated, see if special is to be edited
   useEffect(() => {
       getSpecialToEdit()
   }, [specials])


   const addNewSpecial = () => {
       
        console.log("special Genre:", specialGenreId)
        
       if (specialLengthId === 0) {
           window.alert("Please select a length for this special")
       }
       if (specialPlatformId === 0) {
           window.alert("Please select a platform for this special")
       }
       if (specialGenreId === 0) {
        window.alert("Please select a genre for this special")
    }


       else {
           if (toEdit) {
            changeSpecial({
                id: special.id,
                name: special.name,
                comicName: special.comicName,
                rating: special.rating,
                specialLengthId: specialLengthId,
                specialPlatformId: specialPlatformId,
                cost: special.cost,
                clean: cleanStatusString,
                comments: special.comments,
                specialGenreId: specialGenreId,
                userId: parseInt(localStorage.getItem("app_user_id"))
            })
            .then(() => props.history.push("/specials"))
        }
           else {
           addSpecial({
                name: special.name,
                comicName: special.comicName,
                rating: special.rating,
                specialLengthId: specialLengthId,
                specialPlatformId: specialPlatformId,
                cost: special.cost,
                clean: cleanStatusString,
                comments: special.comments,
                specialGenreId: specialGenreId,
                userId: parseInt(localStorage.getItem("app_user_id"))
           })
           .then(() => props.history.push("/specials"))
       }
   }
}

   return (
       <form className="specialForm">
           <h2 className="specialForm__title">{toEdit ? "Edit Special's Details" : "Add Special"}</h2>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="name">Special name: </label>
                   <input type="text" name="name" required autoFocus className="form-control" 
                   placeholder="Special name" 
                   value={special.name}
                   onChange={handleSpecialEdit}
                   />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="comicName">Comedian's name: </label>
                   <input type="text" name="comicName" required autoFocus className="form-control" 
                   placeholder="Comedian's name" 
                   value={special.comicName}
                   onChange={handleSpecialEdit}
                   />
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="rating">Your rating: </label>
                   <select name="rating" className="form-control"
                   value={special.rating}
                   onChange={handleSpecialEdit}>
                    <option value="0">Select your rating of this special</option>
                    {ratingDropdowns()}
                    </select>
               </div>
            </fieldset>
            <fieldset>
               <div className="form-section">
                   <label htmlFor="specialLength">Special's Length: </label>
                   <select name="specialLengthId" className="form-control" 
                   value={specialLengthId}
                   onChange={handleSpecialEdit}>
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
                   <select name="specialPlatformId" className="form-control" 
                   value={specialPlatformId}
                   onChange={handleSpecialEdit}>
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
                   <input type="text" name="cost" required autoFocus className="form-control" 
                   placeholder="Special's cost"
                   value={special.cost}
                   onChange={handleSpecialEdit}/>
               </div>
           </fieldset>
           <fieldset>
               <div className="form-section">
                   <label htmlFor="specialGenre">Special's Genre: </label>
                   <select name="specialGenreId" className="form-control" 
                   value={specialGenreId}
                   onChange={handleSpecialEdit}>
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
                   <label htmlFor="clean">Is the special clean? </label>
                    <input
                    name="clean"
                    type="checkbox" 
                    onChange={event => {
                        clean(event)
                    }}
                    />
               </div>
            </fieldset>
            <fieldset>
               <div className="form-section">
                   <label htmlFor="comments">Your comments and additional information: </label>
                   <textarea type="text" name="comments" required autoFocus className="form-control" 
                   placeholder="Comments" 
                   value={special.comments}
                   onChange={handleSpecialEdit}/>
               </div>
           </fieldset>
           <button type="submit"
           onClick={event => {
               event.preventDefault()
                addNewSpecial()
           }}
           className="button button-submit">
             {toEdit ? "Save Changes" : "Add Special"}
           </button>
       </form>
   )
}