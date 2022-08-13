import "./ListGrid.css"
import React from 'react';
import ListCard from "../ListCard/ListCard"


export default function ListGrid(props) {
    return (
      <div className="list-grid">
        {props.categoryRecipes.map((item) => {          
          let subCat = Object.keys(item)
          if (item[subCat[0]].length != 0) {
            return (
              <ListCard category= {props.category} subCat={subCat[0]} subCatRecipes={item[subCat[0]]}
              handleListDetails={props.handleListDetails} setChosenRecipe={props.setChosenRecipe} handleChooseRecipe={props.handleChooseRecipe}
              userLists={props.userLists} newListRecipes={props.newListRecipes} handleAddRecipe={props.handleAddRecipe} idToken={props.idToken}/>
            )
          }
        })}
      </div>
    )
}