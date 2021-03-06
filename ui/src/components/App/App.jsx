import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import Navbar from '../Navbar/Navbar';
import './App.css';
import Home from '../Home/Home';
import NotFound from "../NotFound/NotFound"
import ListDetails from "../ListDetails/ListDetails"
import { useState, useEffect} from "react"
import axios from 'axios'

export default function App() {
  const [categories, setCategories]  = useState(["brunch"])
  const [subCategories, setSubCategories]  = useState(["under 30 minutes"])
  const [categorizedRecipes, setCategorizedRecipes]  = useState({})
  const [error, setError] = useState("")
  const [isFetching, setIsFetching] = useState("")
  const [retrievedRecipes, setRetrievedRecipes] = useState(false)
  const [category, setCategory]  = useState("")
  const [subCategory, setSubCategory]  = useState("")
  //user state variables
  const [objectId, setObjectId] = useState("")
  const [idToken, setIdToken] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [userLists, setUserLists] = useState([])
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [sub, setSub] = useState("")


  console.log("from app")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function requests() {
      await axios.get('http://localhost:3001/')
        .then(result => {
          console.log('data',result)
          setCategorizedRecipes(result.data["all lists"])
          setRetrievedRecipes(true)
        })
        .catch(e=>setError(e))
    }
    if (!retrievedRecipes) {
      requests()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleListDetails = (cat, subCat) => {
    setCategory(cat)
    setSubCategory(subCat)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar idToken={idToken} setIdToken={setIdToken} setAccessToken={setAccessToken} setExpiryDate={setExpiryDate} 
            setObjectId={setObjectId} setUserLists={setUserLists} setName={setName} setFirstName={setFirstName} setEmail={setEmail} 
            setSub={setSub} />
          <Routes>
            <Route path="/" element={
              <div className='main-page'>
                <WelcomeBanner />
                <Home categorizedRecipes={categorizedRecipes} categories={categories} subCategories={subCategories} 
                    isFetching = {isFetching} setIsFetching = {setIsFetching} handleListDetails={handleListDetails}
                    idToken={idToken}/>
              </div>
            }/>
            <Route path="/list/:category/:listName" element={
              <div className='single-list'>
                <ListDetails categorizedRecipes={categorizedRecipes} category={category} subCategory={subCategory}/>
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