import "./Popup.css"
import React from "react"

export default function Popup(props) {
    return ( 
        (props.recipePopup) ? 
            (
                <div className="recipe-popup">
                    <div className="recipe-popup-inner">
                        <button className="close-btn" onClick={()=> props.setRecipePopup(!props.recipePopup)}>close</button>
                        <div className="recipe-name">
                            {props.recipe.name}
                        </div>
                        {props.recipe.descrition ? 
                            <div className="recipe-description">
                                {props.recipe.description}
                            </div> : ""
                        }
                        {props.recipe.instructions ? 
                            <div className="recipe-instructions">
                                {props.recipe.instructions.map(i => {
                                    return (i.display_text)
                                })}
                            </div> : ""
                        }
                    </div>
                </div>
            ) : ""
        
    )
}