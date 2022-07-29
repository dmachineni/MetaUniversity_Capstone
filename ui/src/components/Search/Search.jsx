import React from "react"
import "./Search.css"
import ListCard from "../ListCard/ListCard"

export default function Search(props) {
    
    return (
        <div className="search">
            <form className="search-bar">
                <label> 
                    <div className="search-here-text">Search Here: </div>
                    <input label = "Search Here" type = "text" id = "search" placeholder="Search for a recipe here" onChange={(e) => {
                        // e.preventDefault()
                        props.handleOnSearchChange(e.target.value)}}
                    ></input>
                    <button className="submit-search-input" onClick={(e) => {
                        const node = document.querySelector("#search")
                        e.preventDefault()
                        props.handleOnSearchChange(node.value)
                    }}>Search</button>
                </label>
            </form>

            <div className="search-results" >
                {props.searchRecipes !== undefined && props.searchRecipes.map((rec, idx) => {
                    return(
                        <ListCard category="search" recipe={rec} setChosenRecipe={props.setChosenRecipe} handleChooseRecipe={props.handleChooseRecipe}  
                            userLists={props.userLists} setNewListRecipes={props.setNewListRecipes} createList ={props.createList} newListRecipes={props.newListRecipes}
                            setUserListName={props.setUserListName} handleAddRecipe={props.handleAddRecipe}/>
                    )
                })}
            </div>
        </div>
    )
}