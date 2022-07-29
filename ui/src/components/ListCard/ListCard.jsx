import "./ListCard.css"
import * as React from "react"
import { Link } from "react-router-dom"
import Popup from "../Popup/Popup"
import { useState } from "react"
import AddToPopup from "../AddToPopup/AddToPopup"

export default function ListCard(props) {
  const [recipePopup, setRecipePopup] = useState(false)
  const [addToPopup, setAddToPopup] = useState(false)

  const Subcat = () => {
    return (
      <div className="subcat-list-card">
        <Link onClick={() => props.handleListDetails(props.category, props.subCat, props.subCatRecipes)} className = "list-img" to={`/list/${props.category}/${props.subCat}`}>
          <img className="subcat-list-card-img" src={props.subCatRecipes[0]["thumbnail_url"]}></img>  
        </Link>
  
        <p className = "subcat-list-name" >
          {props.subCat}
        </p>
  
      </div>
    )
  }

  const Search = () => {
    return (
      <div className="search-list-card">
        <img className="search-list-card-img" src={props.recipe.thumbnailUrl} onClick={()=> setRecipePopup(!recipePopup)}></img>  
        <div className="search-list-details">
          <p className = "search-list-name" >
            {props.recipe.name}
          </p>
          <button className="search-list-add" onClick={(e) => {props.setChosenRecipe(props.recipe); setAddToPopup(true)}}>
            +
          </button>
        </div>
        

        <Popup setRecipePopup={setRecipePopup} recipePopup={recipePopup} recipe={props.recipe}/>
        <AddToPopup setAddToPopup={setAddToPopup} addToPopup={addToPopup} recipe={props.recipe} userLists={props.userLists} 
          setNewListRecipes={props.setNewListRecipes} createList ={props.createList} setUserListName={props.setUserListName} 
          handleAddRecipe={props.handleAddRecipe}s/>

      </div>
    )
  }

  return (
    <div className="list-card">
      {props.category === "search" ? Search():Subcat()}
    </div>
  )

  
}