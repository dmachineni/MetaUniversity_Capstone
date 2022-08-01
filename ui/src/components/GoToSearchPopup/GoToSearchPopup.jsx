import "./GoToSearchPopup.css"
import React from "react"
import { Link } from "react-router-dom"

export default function GoToSearchPopup(props) {
    return ( 
        (props.goToSearchPopup) ? 
            (
                <div className="go-to-search-popup">
                    <div className="go-to-search-popup-inner">
                        <button className="close-btn" onClick={()=> props.setGoToSearchPopup(false)}>close</button>
                        <div className="no-recipes-text">
                            No Recipes Added Yet
                        </div>
                        <Link className="go-to-search" to={'/search'}>
                            <div className="go-to-search-text">
                                Go To Search
                            </div>
                        </Link>
                    </div>
                </div>
            ) : ""
        
    )
}