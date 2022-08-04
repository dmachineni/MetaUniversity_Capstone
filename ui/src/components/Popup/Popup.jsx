import "./Popup.css"
import React from "react"
import { useState } from "react"
import GoogleCalEventForm from "../GoogleCalEventForm/GoogleCalEventForm"

export default function Popup(props) {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const generateGoogleCalEventForm = () => {

    }

    return ( 
        (props.recipePopup) ? 
            (
                <div className="recipe-popup">
                    <div className="recipe-popup-inner">
                        <button className="close-btn" onClick={()=> props.setRecipePopup(!props.recipePopup)}>close</button>
                        <div className="recipe-name">
                            {props.recipe.name}
                        </div>
                        {props.recipe.descrition ? 
                            <div className="recipe-description">
                                {props.recipe.description}
                            </div> : ""
                        }
                        {props.recipe.instructions ? 
                            <div className="recipe-instructions">
                                {props.recipe.instructions.map(i => {
                                    return (i.display_text)
                                })}
                            </div> : ""
                        }
                        <button className="add-recipe-to-calendar-btn" onClick={()=>setIsFormOpen(!isFormOpen)}>add to calendar</button>
                        {isFormOpen ? <GoogleCalEventForm setIsFormOpen={setIsFormOpen} setStartDateTime={props.setStartDateTime} setEndDateTime={props.setEndDateTime} 
                            setRecipePopup={props.setRecipePopup} handleCreateCalendarEvent={props.handleCreateCalendarEvent} recipe={props.recipe}/> : ""}

                    </div>
                </div>
            ) : ""
        
    )
}