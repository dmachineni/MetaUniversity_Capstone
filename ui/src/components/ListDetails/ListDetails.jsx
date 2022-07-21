import "./ListDetails.css"
import * as React from "react"
import ListDetailsBanner from "../ListDetailsBanner/ListDetailsBanner"
import ListDetailsButtons from "../ListDetailsButtons/ListDetailsButtons"

export default function ListDetails(props) {
    let len = props.categorizedRecipes[props.category].length
    return (
        <div className="single-list">
            <ListDetailsBanner />
            <ListDetailsButtons />
        </div>
    )
}