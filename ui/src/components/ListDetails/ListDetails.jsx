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
        props.subCatRecipes[randomNum].thumbnailUrl === undefined ? 
            profilePic = props.subCatRecipes[randomNum].thumbnail_url : 
            profilePic = props.subCatRecipes[randomNum].thumbnailUrl
    } else {
        profilePic = props.pic
    }

    return (
        <div className="single-list">
            <ListDetailsHero subCatRecipes={props.subCatRecipes} category={props.category} subCategory={props.subCategory} categorizedRecipes={props.categorizedRecipes} profilePic={profilePic}/>
            <ListDetailsButtons />
            <RecipeGrid subCatRecipes={props.subCatRecipes} userLists={props.userLists} setNewListRecipes={props.setNewListRecipes} createList ={props.createList} setUserListName={props.setUserListName} 
                handleAddRecipe={props.handleAddRecipe} setChosenRecipe={props.setChosenRecipe} idToken={props.idToken}/>
        </div>
    )
}