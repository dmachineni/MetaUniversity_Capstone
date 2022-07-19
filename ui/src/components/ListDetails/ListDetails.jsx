import "./ListDetails.css"
import * as React from "react"
import GeneratePopUp from "../GeneratePopUp/GeneratePopUp"

export default function SingleList(props) {
    return (
        <div className="single-list">
            <div className="singlie-list-banner">
                {props.category}{props.subCategory}
            </div>
            <GeneratePopUp />
        </div>
    )
}