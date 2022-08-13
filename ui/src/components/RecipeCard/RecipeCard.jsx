import "./RecipeCard.css"
import * as React from "react"
import { useState } from "react"
import Popup from "../Popup/Popup"
import AddToPopup from "../AddToPopup/AddToPopup"

export default function RecipeCard(props) {
    const [recipePopup, setRecipePopup] = useState(false)
    const [addToPopup, setAddToPopup] = useState(false)

    return (
        <div className="recipe-card">
            <img className="recipe-card-img" src={props.pic} onClick={()=> setRecipePopup(!recipePopup)}></img> 
            <p className="recipe-card-name">{props.name}</p>
            {props.idToken === "" ? "" : 
                <button className="search-list-add" onClick={(e) => {props.setChosenRecipe(props.recipe); setAddToPopup(true)}}>
                    +
                </button>
            }
            <div className="recipe-card-allergens">{
                props.recipe.allergens.map((a,idx) => {
                    // <div> 
                        let divId = `${a}-${idx}`
                        let color
                        if(a === "milk") {
                            color = "#F1B8FF"
                        } else if (a === "soy") {
                            color = "#FEFFB8"
                        } else if (a === "eggs") {
                            color = "#D9FFC7"
                        } else if (a === "nuts") {
                            color = "#ABE1FF"
                        }

                        var newStyles = document.createElement('style')
                        document.head.append(newStyles)
                        newStyles.innerHTML = `#${divId} {` +
                            "background-color: " +color +
                        "}"

                        return (<div className="single-allergen-tag" id={divId}>{a}</div>)
                    // </div>
                })
            }</div>

            <Popup setRecipePopup={setRecipePopup} recipePopup={recipePopup} recipe={props.recipe} setStartDateTime={props.setStartDateTime} 
                setEndDateTime={props.setEndDateTime} handleCreateCalendarEvent={props.handleCreateCalendarEvent} endDateTime={props.endDateTime}/>
            <AddToPopup setAddToPopup={setAddToPopup} addToPopup={addToPopup} recipe={props.recipe} userLists={props.userLists} 
                setNewListRecipes={props.setNewListRecipes} createList ={props.createList} setUserListName={props.setUserListName} 
                handleAddRecipe={props.handleAddRecipe}/>

        </div>
    )
}

