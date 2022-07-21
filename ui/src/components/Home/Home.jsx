import "./Home.css"
import * as React from "react"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import Search from "../Search/Search"
import Categories from "../Categories/Categories"
import { useState } from "react"

export default function Home(props) {
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [startDateTime, setStartDateTime] = useState('')
    const [endDateTime, setEndDateTime] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    return (
        <div className="home">
            <Search />
            <Categories categorizedRecipes = {props.categorizedRecipes} categories={props.categories} 
                subCategories={props.subCategories} handleListDetails={props.handleListDetails}
                idToken={props.idToken}/>
            <About />
            <ContactUs />
        </div>
    )
}