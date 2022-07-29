import React from "react"

export default function Search() {
    return (
        <div className="search">
            Search Here:  
            <span className="search-bar">
                <input type = "text" id = "search" placeholder="Search for a recipe here"></input>
            </span>
        </div>
    )
}