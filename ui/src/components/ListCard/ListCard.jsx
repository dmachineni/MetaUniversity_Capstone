import "./ListCard.css"
import * as React from "react"
import { Link } from "react-router-dom"

export default function ListCard(props) {
    return (
      <div className="list-card">
        <Link onClick={() => props.handleListDetails(props.category, props.subCat, props.subCatRecipes)} className = "list-img" to={`/list/${props.category}/${props.subCat}`}>
          <img className="list-card-img" src={props.subCatRecipes[0]["thumbnail_url"]}></img>  
        </Link>

        <p className = "list-name" >
          {props.subCat}
        </p>

      </div>
    )
}