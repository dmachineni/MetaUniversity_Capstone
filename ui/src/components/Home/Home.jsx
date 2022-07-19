import "./Home.css"
import * as React from "react"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import Search from "../Search/Search"
import Categories from "../Categories/Categories"
import { useState } from "react"

export default function Home(props) {
    const handleSubmit = (e) => {
    e.preventDefualt()
    console.log(summary, description, )
    }

    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    return (
        <div className="home">
            {/* <div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="summary">Summary</label>
                <br />
                <input type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)}/>
                <br />

                <label htmlFor="description">Description</label>
                <br />
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <br />

                <label htmlFor="location">location</label>
                <br />
                <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)}/>
                <br />

                <label htmlFor="startDateTime">Start Date Time</label>
                <br />
                <input type="datetime-local" id="startDateTime" value={startDateTime} onChange={e => setStartDateTime(e.target.value)}/>
                <br />

                <label htmlFor="endDateTime">Summary</label>
                <br />
                <input type="datetime-local" id="endDateTime" value={endDateTime} onChange={e => setEndDateTime(e.target.value)}/>
                <br />

                <button type='submit'>create event</button> 
              </form>
            </div> */}

            <Search />
            <Categories categorizedRecipes = {props.categorizedRecipes} categories={props.categories} 
                subCategories={props.subCategories} handleListDetails={props.handleListDetails}/>
            <About />
            <ContactUs />
        </div>
    )
}