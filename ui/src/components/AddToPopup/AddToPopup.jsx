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
                                {/* <div className="add-to-new-list" onClick={()=>{
                                    props.newListRecipes([props.recipe])
                                    props.setUserListName("New Playlist: "+props.recipe.name) // fix later
                                    props.createList();
                                    props.setAddToPopup(false)
                                }}>New List</div> */}
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

// import "./Popup.css"
// import React from "react"

// export default function Popup(props) {
//     return ( 
//         (props.recipePopup) ? 
//             (
//                 <div className="recipe-popup">
//                     <div className="recipe-popup-inner">
//                         <button className="close-btn" onClick={()=> props.setRecipePopup(!props.recipePopup)}>close</button>
//                         <div className="recipe-name">
//                             {props.recipe.name}
//                         </div>
//                         {props.recipe.descrition ? 
//                             <div className="recipe-description">
//                                 {props.recipe.description}
//                             </div> : ""
//                         }
//                         {props.recipe.instructions ? 
//                             <div className="recipe-instructions">
//                                 {props.recipe.instructions.map(i => {
//                                     return (i.display_text)
//                                 })}
//                             </div> : ""
//                         }
//                     </div>
//                 </div>
//             ) : ""
        
//     )
// }