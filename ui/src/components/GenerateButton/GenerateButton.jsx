import "./GenerateButton.css"
import * as React from "react"
import AddToCalendar from "../AddToCalendar/AddToCalendar"

export default function GenerateButton() {
    return (
        <div className="generate-pop-up">
            <AddToCalendar />
        </div>
    )
}