import React, {useContext, useEffect, useState } from "react"   
import { ComedianContext } from "./ComedianProvider"
import "./Comedian.css"

export const ComedianForm = (props) => {
    //context provider for data
    const { addComedian, changeComedian, getComedians, comedians } = useContext(ComedianContext)


    let podcastStatus = false
    

    //component state
    const [comedian, setComedian] = useState({})

    //checks for URL parameter to see it comedian exists
    //to differentiate between editing and adding new
    const toEdit = props.match.params.hasOwnProperty("comedianId")

    const handleComedianEdit = (event) => {
        /* When changing a state object or array, create a
        new one and change state instead of modifying current
        */
       const newComedian = Object.assign({}, comedian)
       newComedian[event.target.name] = event.target.value
       setComedian(newComedian)
    }

    /* If there a comedianId in the URL, the user wants
    to edit a comedian
    First, get the value of the comedianId
    Second, use Id to find comedian
    Then, update the component state variable
    */
   const getComedianToEdit = () => {
       if (toEdit) {
           const comedianId = parseInt(props.match.params.comedianId)
           const selectedComedian = comedians.find(comedian => comedian.id === comedianId) || {}
           setComedian(selectedComedian)
       }
   }

   //get comedians on initialization
   useEffect (() => {
       getComedians()
   }, [])

   //Once the provider is updated, see if comedian is to be edited

   useEffect (() => {
       getComedianToEdit()
   }, [comedians])

   const addNewComedian = () => {
       if (toEdit) {
           changeComedian({
               id: comedian.id,
               name: comedian.name,
               watched: comedian.watched,
               toWatch: comedian.toWatch,
               podcast: podcastStatus.toString(),
               comments: comedian.comments,
               userId: parseInt(localStorage.getItem("app_user_id"))
           })
           .then(() => props.history.push("/comedians"))
       }
       else{
           addComedian({
            name: comedian.name,
            watched: comedian.watched,
            toWatch: comedian.toWatch,
            podcast: podcastStatus.toString(),
            comments: comedian.comments,
            userId: parseInt(localStorage.getItem("app_user_id"))
           })
           .then(() => props.history.push("/comedians"))
       }
   }
   
   const podcast= (event) => {
    return podcastStatus = event.target.checked
}

   return (
       <form className="comedianForm">
           <h2 className="comedianForm__title">{toEdit ? "Edit Comedian's Details" : "Add Comedian"}</h2>
            <fieldset>
                <div className="form-section">
                    <label htmlFor="name">Comedian's Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                    placeholder="Comedian's name"
                    value={comedian.name}
                    onChange={handleComedianEdit}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-section">
                    <label htmlFor="name">Things you've watched by this comedian: </label>
                    <input type="text" name="watched" required autoFocus className="form-control"
                    placeholder="Watched list"
                    value={comedian.watched}
                    onChange={handleComedianEdit}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-section">
                    <label htmlFor="name">Things you want to watch by this comedian: </label>
                    <input type="text" name="toWatch" required autoFocus className="form-control"
                    placeholder="To watch list"
                    value={comedian.toWatch}
                    onChange={handleComedianEdit}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-section">
                    <label htmlFor="podcast">Do they have a podcast? Check if yes: </label>
                    <input
                    name="podcast"
                    type="checkbox" 
                    onChange={event => {
                        podcast(event)
                    }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-section">
                    <label htmlFor="name">Comments on this comedian: </label>
                    <input type="text" name="comments" required autoFocus className="form-control"
                    placeholder="Comments"
                    value={comedian.comments}
                    onChange={handleComedianEdit}
                    />
                </div>
            </fieldset>
            <button type="submit"
            onClick={event => {
                event.preventDefault()
                addNewComedian()
            }}
            className="button button-submit">
                {toEdit ? "Save Changes" : "Add Comedian"}
            </button>
       </form>
   )
}