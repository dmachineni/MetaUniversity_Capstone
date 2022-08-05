import "./ListDetails.css"
import * as React from "react"
import ListDetailsHero from "../ListDetailsHero/ListDetailsHero"
import ListDetailsButtons from "../ListDetailsButtons/ListDetailsButtons"
import RecipeGrid from "../RecipeGrid/RecipeGrid"

export default function ListDetails(props) {

    let profilePic
    if (props.pic === "") {
        let len = props.subCatRecipes.length
        let randomNum = Math.floor(Math.random() * len);
        const randomRecipe = props.subCatRecipes[randomNum]
        profilePic = randomRecipe.thumbnailUrl === undefined ? randomRecipe.thumbnail_url : randomRecipe.thumbnailUrl
    } else {
        profilePic = props.pic
    }

    return (
        <div className="single-list">
            <ListDetailsHero subCatRecipes={props.subCatRecipes} category={props.category} subCategory={props.subCategory} 
                categorizedRecipes={props.categorizedRecipes} profilePic={profilePic}/>
            <ListDetailsButtons subCatRecipes={props.subCatRecipes} setStartDateTime={props.setStartDateTime} 
                setEndDateTime={props.setEndDateTime} handleCreateCalendarEvent={props.handleCreateCalendarEvent}/>
            <RecipeGrid subCatRecipes={props.subCatRecipes} userLists={props.userLists} setNewListRecipes={props.setNewListRecipes} 
                createList ={props.createList} setUserListName={props.setUserListName} handleAddRecipe={props.handleAddRecipe} 
                setChosenRecipe={props.setChosenRecipe} idToken={props.idToken} setStartDateTime={props.setStartDateTime} 
                setEndDateTime={props.setEndDateTime} handleCreateCalendarEvent={props.handleCreateCalendarEvent} endDateTime={props.endDateTime}/>
        </div>
    )
}