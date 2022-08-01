import "./RecipeGrid.css"
import * as React from "react"
import RecipeCard from "../RecipeCard/RecipeCard"

export default function RecipeGrid(props) {
    return (
        <div className="recipe-grid">
            {   
                props.subCatRecipes.map((recipe) => {
                    let pic
                    {recipe.thumbnailUrl === undefined ? pic = recipe.thumbnail_url : pic = recipe.thumbnailUrl}
                    return <RecipeCard pic={pic} name={recipe.name} recipe={recipe} userLists={props.userLists}
                        setNewListRecipes={props.setNewListRecipes} createList ={props.createList} setUserListName={props.setUserListName} 
                        handleAddRecipe={props.handleAddRecipe} setChosenRecipe={props.setChosenRecipe}/>
                })
            }
        </div>
    )
}