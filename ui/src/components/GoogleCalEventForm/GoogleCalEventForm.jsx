import "./GoogleCalEventForm.css"
import * as React from "react"
import { useState } from "react"

export default function GoogleCalEventForm(props) {
//    return (
//             <div className="google-cal-form-box">
//                 <form className="google-cal-form-info">
//                     <label htmlFor="startDateTime">Start Date Time
//                         <input className="start-time-input" type="datetime-local" id="startDateTime" onChange={e => props.setStartDateTime(e.target.value)}/>
//                     </label>
//                     <br/>
//                     <label htmlFor="endDateTime">End Date Time
//                         <input className="end-time-input" type="datetime-local" id="endDateTime" onChange={e => props.setEndDateTime(e.target.value)}/>
//                     </label>

//                     <br/>

//                     <button className="close" type="button" onClick={()=>props.setIsFormOpen(false)}>Close</button>
//                     <button className="submit"  onClick={(e)=> {
//                         e.preventDefault()
//                         props.setIsFormOpen(false)
//                     }}>Show Recipe</button>
//                 </form>
//             </div>
//     )
    return (
        <div className="google-cal-form-box">
            <form className="google-cal-form-info">
                <label htmlFor="startDateTime">Start Date Time
                    <input className="start-time-input" type="datetime-local" id="startDateTime" onChange={e => props.setStartDateTime(e.target.value)}/>
                </label>
                <br/>
                <label htmlFor="endDateTime">End Date Time
                    <input className="end-time-input" type="datetime-local" id="endDateTime" onChange={e => props.setEndDateTime(e.target.value)}/>
                </label>

                <br/>

                <button className="close" type="button" onClick={()=>props.setIsFormOpen(false)}>Close</button>
                <button className="submit"  onClick={(e)=> {
                    e.preventDefault()
                    props.handleCreateCalendarEvent(props.recipe.name,props.recipe.description)
                    props.setIsFormOpen(false)
                    props.setRecipePopup(false)
                }}>Create Event</button>
            </form>
        </div>
    )

}