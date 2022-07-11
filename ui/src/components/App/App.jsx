import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import Navbar from '../Navbar/Navbar';
import './App.css';
import Home from '../Home/Home';
import NotFound from "../NotFound/NotFound"
import SingleList from "../SingleList/SingleList"
import { useState, useEffect} from "react"
import axios from 'axios'

export default function App() {
  const [categories, setCategories]  = useState(["brunch"])
  const [subCategories, setSubCategories]  = useState(["under 30 minutes"])
  const [categorizedRecipes, setCategorizedRecipes]  = useState({})
  const [recipes, setRecipes] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    console.log("use effect")

    axios.post('http://localhost:3001/', {
      categories: categories, subCategories: subCategories
    })
      .then(result => {(console.log('cat',result.data.categories, ' subcat:',result.data.subCategories))})
      .catch(e=>setError(e))

    axios.get('http://localhost:3001/')
      .then(result => {
        // console.log('data',result)
        setCategorizedRecipes(result.data["categorized lists"]["all lists"])
      })
      .catch(e=>setError(e))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //double check the above line

  console.log('recipes:',categorizedRecipes)
  // setCategorizedRecipes()

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <div className='main-page'>
                <WelcomeBanner />
                <Home categorizedRecipes={categorizedRecipes} categories={categories} subCategories={subCategories}/>
              </div>
            }/>
            <Route path="/list/:category/:listName" element={
              <div className='single-list'>
                <SingleList categorizedRecipes={categorizedRecipes}/>
              </div>
            }/>
            <Route path="*" element={
              <div>
                <NotFound />
              </div>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}