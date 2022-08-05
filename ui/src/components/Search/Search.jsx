import React from "react"
import "./Search.css"
import ListCard from "../ListCard/ListCard"
import { useEffect, useState, useRef} from "react"

export default function Search(props) {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);

    useEffect(() => {
        props.setSearchRecipes([])
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 400);
        return () => clearTimeout(timer);
    }, [debouncedTerm])

    useEffect(() => {
        if(term !== ''){
            props.handleOnSearchChange(term)
        }
        else{
            props.setSearchRecipes([]);
        }
    }, [term]);
    
    return (
        <div className="search">
            <form className="search-bar">
                <label> 
                    <div className="search-here-text">Search Here: </div>
                    <input label = "Search Here" type = "text" id = "in a fsearch" placeholder="Search for a recipe here" value={debouncedTerm} onChange={(e) => {
                        e.preventDefault()
                        setDebouncedTerm(e.target.value)}}
                        onSubmit={(e) => e.preventDefault()}
                    ></input>
                </label>
            </form>

            <div className="search-results" >
                {props.lastSearchPromise.current === props.currentPromise.current && props.searchRecipes !== undefined ?
                    props.searchRecipes.map((rec, idx) => {
                        return(
                            <ListCard category="search" recipe={rec} setChosenRecipe={props.setChosenRecipe} handleChooseRecipe={props.handleChooseRecipe}  
                                userLists={props.userLists} setNewListRecipes={props.setNewListRecipes} createList ={props.createList} newListRecipes={props.newListRecipes}
                                setUserListName={props.setUserListName} handleAddRecipe={props.handleAddRecipe} idToken={props.idToken}/>
                        )
                    }) : ""
                }
            </div>
        </div>
    )
}