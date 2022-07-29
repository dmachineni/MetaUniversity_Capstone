import "./RecipeGrid.css"
import * as React from "react"
import RecipeCard from "../RecipeCard/RecipeCard"

export default function RecipeGrid(props) {
    return (
        <div className="recipe-grid">
            {   
                props.subCatRecipes.map((recipe) => {
                    return <RecipeCard pic={recipe.thumbnail_url} name={recipe.name} recipe={recipe}/>
                })
            }
        </div>
    )
}