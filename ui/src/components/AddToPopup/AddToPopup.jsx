import "./AddToPopup.css"
import React from "react"

export default function AddToPopup(props) {
    return ( 
        (props.addToPopup) ? 
            (
                <div className="add-to-popup">
                    <div className="recipe-popup-inner">
                        <button className="close-btn" onClick={()=> props.setAddToPopup(false)}>close</button>
                        <div className="add-to-options">
                                {
                                    props.userLists.map((l) => { 
                                        let name = Object.keys(l)[0];
                                        return (
                                            <div className="add-to-existing-list" onClick={() => {
                                                props.handleAddRecipe(name);
                                                props.setAddToPopup(false)
                                            }}>{name}</div>
                                        )
                                    })
                                }
                            
                        </div>
                        
                    </div>
                </div>
            ) : ""
        
    )
}