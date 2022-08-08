import "./Home.css"
import * as React from "react"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import Categories from "../Categories/Categories"
import ReactLoading from 'react-loading';

export default function Home(props) {
    if(props.categorizedRecipes === {}){
        return(
            <ReactLoading type={"spin"} color={"#000000"} height={667} width={375} />
        )
    }
    return (
        <div className="home">
            {props.categorizedRecipes === {} ? 
                <ReactLoading type={"spin"} color={"#000000"} height={667} width={375} />: 
                <Categories categorizedRecipes = {props.categorizedRecipes} categories={props.categories} 
                    subCategories={props.subCategories} handleListDetails={props.handleListDetails}
                    idToken={props.idToken} userLists={props.userLists} setUserListName={props.setUserListName} 
                    createList={props.createList} setNewListRecipes={props.setNewListRecipes} setChosenRecipe={props.setChosenRecipe} 
                    handleChooseRecipe={props.handleChooseRecipe} newListRecipes={props.newListRecipes} handleAddRecipe={props.handleAddRecipe}/>
            }
            <About />
            <ContactUs />
        </div>
    )
}