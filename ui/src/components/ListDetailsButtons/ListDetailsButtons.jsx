import "./ListDetailsButtons.css"
import * as React from "react"


export default function ListDetailsButtons(props) {
    return (
        <div className="list-details-buttons">
            <button className="generate-now">Generate Now</button>
            <button className="add-recipes">+</button>
        </div>
    )
}