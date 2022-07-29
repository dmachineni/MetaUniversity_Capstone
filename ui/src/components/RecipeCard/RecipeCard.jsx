import "./RecipeCard.css"
import * as React from "react"
import { useState } from "react"
import Popup from "../Popup/Popup"

export default function RecipeCard(props) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    const [recipePopup, setRecipePopup] = useState(false)
>>>>>>> 0080240 (created a search page, rendered search results on the page, and created popup for more information about recipe)
=======
    const [recipePopup, setRecipePopup] = useState(false)
>>>>>>> 36ae1901dc4b47c1840ad85956a4b24446886ab0
    return (
        <div className="recipe-card">
            <img className="recipe-card-img" src={props.pic} onClick={()=> setRecipePopup(!recipePopup)}></img>
            <p className="recipe-card-name">{props.name}</p>
            <Popup setRecipePopup={setRecipePopup} recipePopup={recipePopup} recipe={props.recipe}/>
        </div>
    )
}