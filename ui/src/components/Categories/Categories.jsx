import "./Categories.css"
import React from "react"
import ListGrid from "../ListGrid/ListGrid"
import { useState } from "react" 

export default function Categories(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    let categories = Object.keys(props.categorizedRecipes)
    
    const generateNewListForm = () => {
        return (
            <div className="popup-box">
                <form className="list-info">
                    <label>Cookbook Name: 
                        <input className="name-input" type="text" name="name"
                            placeholder="Cookbook Name" onChange={(e)=>props.setUserListName(e.target.value)}></input>
                    </label>
                    <button className="close" type="button" onClick={()=>setIsPopupOpen(!isPopupOpen)}>Close</button>
                    <button className="submit"  onClick={(e)=> {
                        e.preventDefault()
                        setIsPopupOpen(!isPopupOpen)
                        props.createList()
                    }}>Create</button>
                </form>
            </div>
        )
    }

    const handleUserLists = () => {
        return(
            <div className="user-list-info">
                <div className="my-lists">
                    <button className="new-user-list-button" onClick={()=>setIsPopupOpen(!isPopupOpen)}>Create new list!</button>
                    {isPopupOpen ? generateNewListForm() : ""}
                    <h2>MY LISTS</h2>
                    <ListGrid category={"user lists"} categoryRecipes={props.userLists} handleListDetails={props.handleListDetails} 
                        setChosenRecipe={props.setChosenRecipe} userLists={props.userLists} handleChooseRecipe={props.handleChooseRecipe}
                        setNewListRecipes={props.setNewListRecipes} createList ={props.createList} newListRecipes={props.newListRecipes} 
                        handleAddRecipe={props.handleAddRecipe} idToken={props.idToken}/>
                </div>
                {handleGeneralCategories()}
            </div>
        )
    }

    const handleGeneralCategories = () => {
        return (
            categories.map((category, idx) => {
                return(
                    <div className="category-info" key={idx}>
                        <h2>{category.toUpperCase()}</h2>
                        <ListGrid category= {category} categoryRecipes = {props.categorizedRecipes[category]} 
                            handleListDetails={props.handleListDetails} handleChooseRecipe={props.handleChooseRecipe}
                            userLists={props.userLists} idToken={props.idToken}/>
                    </div>
                )
            })
        )
    }

    return (
        <div className="categories-list">
            {props.idToken === "" ?  handleGeneralCategories():handleUserLists()}
        </div>
    )
}