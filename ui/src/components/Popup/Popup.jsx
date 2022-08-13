import "./Popup.css"
import React from "react"
import { useState } from "react"
import GoogleCalEventForm from "../GoogleCalEventForm/GoogleCalEventForm"

export default function Popup(props) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    let nutritionKeys = Object.keys(props.recipe.nutrition)
    let pic = props.recipe.thumbnailUrl === undefined ? props.recipe.thumbnail_url : props.recipe.thumbnailUrl

    return ( 
        (props.recipePopup) ? 
            (
                <div className="recipe-popup">
                    <div className="recipe-popup-inner">
                        <button className="close-btn" onClick={()=> props.setRecipePopup(!props.recipePopup)}>close</button>
                        <div className="recipe-name">
                            {props.recipe.name}
                        </div>
                        {props.recipe.totalTimeMinutes ? 
                            <div className="recipe-totalTimeMinutes">
                                Total Time: 
                                {props.recipe.totalTimeMinutes > 60 ? (
                                    " "+Math.floor(props.recipe.totalTimeMinutes/60) + " hours " + props.recipe.totalTimeMinutes%60+" minutes"
                                ):" "+props.recipe.totalTimeMinutes+" minutes"} 
                            </div> : ""
                        }
                        {!props.recipe.totalTimeMinutes && props.recipe.totalTimeTier? 
                            <div className="recipe-totalTimeMinutes">
                                Total Time: 
                                {" " +props.recipe.totalTimeTier.display_tier}
                            </div> : ""
                        }
                        <div className="recipe-info">
                            <div className="recipe-info-left">
                                <div className="recipe-ingredient-list">
                                    <div className="recipe-ingredients-list-title">Ingredients</div>
                                    {props.recipe.ingredients.map(i => {
                                        return(
                                            <div className="recipe-ingredient"> {i} </div>
                                        )
                                    })}
                                </div>
                                
                                {props.recipe.descrition ? 
                                    <div className="recipe-description">
                                        {props.recipe.description}
                                    </div> : ""
                                }
                                <br></br>
                                {props.recipe.instructions ? 
                                    
                                    <div className="recipe-instructions">
                                        <div className="recipe-instructions-title">Instructions</div>
                                        {props.recipe.instructions.map((i,idx) => {
                                            return (
                                                <div className="recipe-instructions-info">
                                                    {idx+1}) {i.display_text}
                                                </div>
                                            )
                                        })}
                                    </div> : ""
                                }
                                
                            </div>
                            <div className="recipe-info-right">
                                <img className="recipe-pic" src={pic}></img>
                                <div className="recipe-info-right-sub">
                                    <button className="add-recipe-to-calendar-btn" onClick={()=>setIsFormOpen(!isFormOpen)}>add to calendar</button>
                                    <div className="recipe-nutrition-info">
                                        {Object.keys(props.recipe.nutrition).length === 0 ? 
                                            "" :
                                            <div>
                                                {console.log("hey", props.recipe.nutrition)}
                                                <div className="recipe-nutrition-title">
                                                    Macro Info
                                                </div>
                                                <div className="recipe-nutrition-details">
                                                    {nutritionKeys.map(key => {
                                                        if(key === "updated_at") {
                                                            return
                                                        }
                                                        return (
                                                            <ul className="recipe-nutrition-tag">
                                                                <li>{key}: {props.recipe.nutrition[key]} {key==="calories" ? "" : "g"}</li>
                                                            </ul>
                                                        )
                                                    })}
                                                </div> 
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isFormOpen ? <GoogleCalEventForm setIsFormOpen={setIsFormOpen} setStartDateTime={props.setStartDateTime} setEndDateTime={props.setEndDateTime} 
                            setRecipePopup={props.setRecipePopup} handleCreateCalendarEvent={props.handleCreateCalendarEvent} recipe={props.recipe} endDateTime={props.endDateTime}/> 
                            : ""}

                    </div>
                </div>
            ) : ""
        
    )
}