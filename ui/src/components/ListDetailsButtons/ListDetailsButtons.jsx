import "./ListDetailsButtons.css"
import * as React from "react"
import { useState } from "react"
import Popup from "../Popup/Popup"

export default function ListDetailsButtons(props) {
    const [recipePopup, setRecipePopup] = useState(false)
    const [randomRecipe, setRandomRecipe] = useState()

    const generateRandomRecipe = () => { 
        let len = props.subCatRecipes.length
        let randomNum = Math.floor(Math.random() * len)
        setRandomRecipe(props.subCatRecipes[randomNum])
    }

    return (
        <div className="list-details-buttons">
            <button className="generate-now" onClick={()=>{
                generateRandomRecipe()
                setRecipePopup(!recipePopup)
            }}>Generate Now</button>
            {recipePopup ? <Popup setRecipePopup={setRecipePopup} recipePopup={recipePopup} recipe={randomRecipe} 
                setStartDateTime={props.setStartDateTime} setEndDateTime={props.setEndDateTime} 
                handleCreateCalendarEvent={props.handleCreateCalendarEvent}/> : ""}
        </div>
    )
}