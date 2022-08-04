import "./GoogleCalEventForm.css"
import * as React from "react"

export default function GoogleCalEventForm(props) {
    const handleValidRecipeTime = () => {
        if (props.recipe.totalTimeMinutes) {
            props.setEndDateTime(props.recipe.totalTimeMinutes)
        } else {
            let arr = props.recipe.totalTimeTier.tier.split("_")
            if (arr[2] === "minutes") {
                props.setEndDateTime(parseInt(arr[1]))
            } else if (arr[2] === "hours" || arr[2]==="hour") {
                let arr2 = arr[2].split(".")
                let total = parseInt(arr2[0])*60
                if(arr2[2]) {
                    total += (parseInt(arr2[2])/10)*60
                } 
                props.setEndDateTime(total)
            }
        }
    }

    return (
        <div className="google-cal-form-box">
            <form className="google-cal-form-info">
                <label htmlFor="startDateTime">Start Date Time
                    <input className="start-time-input" type="datetime-local" id="startDateTime" onChange={e => {props.setStartDateTime(e.target.value)}}/>
                </label>
                <br/>
                {props.recipe.totalTimeMinutes || props.recipe.totalTimeTier ?  
                    handleValidRecipeTime()
                    :
                    <label htmlFor="endDateTime">End Date Time
                        <input className="end-time-input" type="datetime-local" id="endDateTime" onChange={e => props.setEndDateTime(e.target.value)}/>
                    </label>
                }

                <br/>

                <button className="close" type="button" onClick={()=>props.setIsFormOpen(false)}>Close</button>
                <button className="submit"  onClick={(e)=> {
                    e.preventDefault()
                    props.handleCreateCalendarEvent(props.recipe.name,props.recipe.description,props.recipe)
                    props.setIsFormOpen(false)
                    props.setRecipePopup(false)
                }}>Create Event</button>
            </form>
        </div>
    )

}