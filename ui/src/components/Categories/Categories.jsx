import "./Categories.css"
import React from "react"
import ListGrid from "../ListGrid/ListGrid"
import { useState } from "react" 
import Search from "../Search/Search"


export default function Categories(props) {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    let categories = Object.keys(props.categorizedRecipes)
    const handleGeneralCategories = () => {
        return (
            categories.map((category, idx) => {
                return(
                    <div className="category-info" key={idx}>
                        <h2>{category.toUpperCase()}</h2>
                        <ListGrid category= {category} categoryRecipes = {props.categorizedRecipes[category]} 
                            handleListDetails={props.handleListDetails}/>
                    </div>
                )
            })
        )
    }
    
    const generateNewListForm = () => {
        return (
            <div className="popup-box">
                <form className="list-info">
                    <label>Cookbook Name: 
                        <input className="name-input" type="text" name="name"
                            placeholder="Cookbook Name" onChange={(e)=>props.setUserListName(e.target.value)}></input>
                    </label>
                    <Search setNewListRecipes={props.setNewListRecipes}/>
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
                    <ListGrid category={"user lists"} categoryRecipes={props.userLists} handleListDetails={props.handleListDetails} />
                </div>
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