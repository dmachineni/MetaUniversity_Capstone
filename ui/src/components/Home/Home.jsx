import "./Home.css"
import * as React from "react"
import About from "../About/About"
import ContactUs from "../ContactUs/ContactUs"
import Search from "react-router-dom"
import Categories from "../Categories/Categories"

export default function Home() {
    return (
        <div className="home">
            <Search />
            <Categories />
            <About />
            <ContactUs />
        </div>
    )
}