import "./RecipeCard.css"
import * as React from "react"

export default function RecipeCard(props) {
    console.log("hi from recipe card")
    return (
        <div className="recipe-card">
            <img className="recipe-card-img" src={props.pic}></img>
            <p className="recipe-card-name">{props.name}</p>
        </div>
    )
}