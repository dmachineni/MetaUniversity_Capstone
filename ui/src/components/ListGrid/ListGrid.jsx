
import "./ListGrid.css"
import React from 'react';
import ListCard from "../ListCard/ListCard"


export default function ListGrid(props) {
    return (
      <div className="list-grid">
        {props.categoryRecipes.map((item,idx) => {
          let subCat = Object.keys(item)
          console.log('subcat', item[subCat[0]])
          console.log('subcat: ', props.categoryRecipes)

          if (item[subCat[0]].length != 0) {
            return (
              <ListCard category= {props.category} subCat={subCat[0]} subCatRecipes={item[subCat[0]]}
              handleListDetails={props.handleListDetails}/>
            )
          }
        })}
      </div>
    )
}