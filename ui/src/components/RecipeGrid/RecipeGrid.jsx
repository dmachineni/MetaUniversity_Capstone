import "./RecipeGrid.css"
import * as React from "react"
import RecipeCard from "../RecipeCard/RecipeCard"

export default function RecipeGrid(props) {
    return (
        <div className="recipe-grid">
            {   
                props.subCatRecipes.map((rec) => {
                    return <RecipeCard pic={rec.thumbnail_url} name={rec.name} rec={rec}/>
                })
            }
        </div>
    )
}