import "./ListDetails.css"
import * as React from "react"
import ListDetailsHero from "../ListDetailsHero/ListDetailsHero"
import ListDetailsButtons from "../ListDetailsButtons/ListDetailsButtons"
import RecipeGrid from "../RecipeGrid/RecipeGrid"
import Search from "../Search/Search"

export default function ListDetails(props) {
    let profilePic
    if (props.pic === "") {
        let len = props.subCatRecipes.length
        let randomNum = Math.floor(Math.random() * len);
        profilePic = props.subCatRecipes[randomNum].thumbnail_url
    } else {
        profilePic = props.pic
    }

    return (
        <div className="single-list">
            <ListDetailsHero subCatRecipes={props.subCatRecipes} category={props.category} subCategory={props.subCategory} categorizedRecipes={props.categorizedRecipes} profilePic={profilePic}/>
            <ListDetailsButtons />
            <RecipeGrid subCatRecipes={props.subCatRecipes}/>

            {props.category === "user lists" ? <Search />:console.log("")}
        </div>
    )
}