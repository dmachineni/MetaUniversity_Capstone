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
            <Popup setRecipePopup={setRecipePopup} recipePopup={recipePopup} recipe={props.recipe}/>
            <AddToPopup setAddToPopup={setAddToPopup} addToPopup={addToPopup} recipe={props.recipe} userLists={props.userLists} 
                setNewListRecipes={props.setNewListRecipes} createList ={props.createList} setUserListName={props.setUserListName} 
                handleAddRecipe={props.handleAddRecipe}/>

        </div>
    )
}

