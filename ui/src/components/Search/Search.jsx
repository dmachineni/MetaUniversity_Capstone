import React from "react"
import "./Search.css"
import ListCard from "../ListCard/ListCard"
import { useEffect } from "react"

export default function Search(props) {
    useEffect(() => {
        props.setSearchRecipes([])
      }, [])
    
    return (
        <div className="search">
            <form className="search-hero">
                <label className="search-hero-contents"> 
                    <div className="search-here-text">Search Here! </div>
                    <input className="search-here-input" label = "Search Here" type = "text" id = "in a fsearch" placeholder="Search for a recipe here" onChange={(e) => {
                        e.preventDefault()
                        props.handleOnSearchChange(e.target.value)}}
                        onSubmit={(e) => e.preventDefault()}
                    ></input>
                </label>
            </form>

            <div className="search-results" >
                {props.searchRecipes !== undefined  ? 
                    props.searchRecipes.map((rec, idx) => {
                        return(
                            <ListCard category="search" recipe={rec} setChosenRecipe={props.setChosenRecipe} handleChooseRecipe={props.handleChooseRecipe}  
                                userLists={props.userLists} setNewListRecipes={props.setNewListRecipes} createList ={props.createList} newListRecipes={props.newListRecipes}
                                setUserListName={props.setUserListName} handleAddRecipe={props.handleAddRecipe} idToken={props.idToken}/>
                        )
                    }) : 
                    ""
                }
            </div>
        </div>
    )
}