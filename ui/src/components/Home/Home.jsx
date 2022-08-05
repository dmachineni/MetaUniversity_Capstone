import "./Home.css"
import * as React from "react"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import Categories from "../Categories/Categories"

export default function Home(props) {
    return (
        <div className="home">
            <Categories categorizedRecipes = {props.categorizedRecipes} categories={props.categories} 
                subCategories={props.subCategories} handleListDetails={props.handleListDetails}
                idToken={props.idToken} userLists={props.userLists} setUserListName={props.setUserListName} 
                createList={props.createList} setNewListRecipes={props.setNewListRecipes} setChosenRecipe={props.setChosenRecipe} 
                handleChooseRecipe={props.handleChooseRecipe} newListRecipes={props.newListRecipes} handleAddRecipe={props.handleAddRecipe}/>
            <About />
            <ContactUs />
        </div>
    )
}