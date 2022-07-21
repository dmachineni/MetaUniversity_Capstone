import "./Categories.css"
import * as React from "react"
import ListGrid from "../ListGrid/ListGrid"
import { useState } from "react" 

export default function Categories(props) {
    let categories = Object.keys(props.categorizedRecipes)
    console.log('hi', props.categorizedRecipes)

    const handleGeneralCategories = () => {
        console.log("handlegeneral")
        return (
            categories.map((category, idx) => {
                return(
                    <div className="category-info" key={idx}>
                        <h2>{category.toUpperCase()}</h2>
                        <ListGrid category= {category} categoryRecipes = {props.categorizedRecipes[category]} 
                            subCategories={props.subCategories} handleListDetails={props.handleListDetails}/>
                    </div>
                )
            })
        )
    }

    const handleUserLists = () => {
        return(
            <div className="user-list-info">
                <h2>My Lists</h2>
                {handleGeneralCategories()}
            </div>
        )
    }

    return (
        <div className="categories-list">
            {props.idToken === "" ?  handleGeneralCategories():handleUserLists()}
        </div>
    )
}