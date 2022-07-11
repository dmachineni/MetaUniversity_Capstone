import "./Home.css"
import * as React from "react"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import Search from "../Search/Search"
import Categories from "../Categories/Categories"

export default function Home(props) {
    return (
        <div className="home">
            <Search />
            <Categories categorizedRecipes = {props.categorizedRecipes} categories={props.categories} subCategories={props.subCategories}/>
            <About />
            <ContactUs />
        </div>
    )
}