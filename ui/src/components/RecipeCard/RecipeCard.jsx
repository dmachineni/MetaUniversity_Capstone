import "./RecipeCard.css"
import * as React from "react"

export default function RecipeCard(props) {
    return (
        <div className="recipe-card">
            <img className="recipe-card-img" src={props.pic}></img>
            <p className="recipe-card-name">{props.name}</p>
        </div>
    )
}