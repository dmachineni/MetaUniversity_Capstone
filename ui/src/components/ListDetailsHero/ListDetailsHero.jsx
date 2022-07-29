import "./ListDetailsHero.css"
import * as React from "react"

export default function ListDetailsHero(props) {
    let len = props.subCatRecipes.length
    
    var newStyles = document.createElement('style')
    document.head.append(newStyles)
    newStyles.innerHTML = ".list-details-hero {" +
        "background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url(" + props.profilePic + ");" +
        "height: 30vh;"+
        "width:10%"+
        "position:relative"+
        "background-attachment:scrolling"+
        "background-position: center;"+
        "background-size: cover;"+
        "position: relative"+
    "}"


    return (
        <div className="list-details-hero">
            <div className="list-details-hero-contents">
                {props.category === "user lists" ? 
                    <h1 className="list-title">{props.subCategory}</h1>
                    :
                    <h1 className="list-title">{props.category}-{props.subCategory}</h1>                    
                }                
                <p className="list-num-of-recipes">{len} recipes</p>
            </div>
            
        </div>
    )
}
