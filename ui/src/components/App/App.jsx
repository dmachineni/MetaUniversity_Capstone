import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner'
import Navbar from '../Navbar/Navbar'
import './App.css'
import Home from '../Home/Home'
import NotFound from "../NotFound/NotFound"
import ListDetails from "../ListDetails/ListDetails"
import {useState, useEffect, useRef} from "react"
import axios from 'axios'
import Search from "../Search/Search"

export default function App() {
  const [categories, setCategories]  = useState(["brunch"])
  const [subCategories, setSubCategories]  = useState(["under 30 minutes"])
  const [categorizedRecipes, setCategorizedRecipes]  = useState({})
  const [error, setError] = useState("")
  const [isFetching, setIsFetching] = useState("")
  const [retrievedRecipes, setRetrievedRecipes] = useState(false)
  const [category, setCategory]  = useState("")
  const [subCategory, setSubCategory]  = useState("")
  const [subCatRecipes, setSubCatRecipes] = useState()
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
  const [code,setCode] = useState("")
  //user list variables
  const [userListName, setUserListName] = useState("")
  const [newListRecipes, setNewListRecipes] = useState([])
  //search variables
  const [searchRecipes, setSearchRecipes] = useState([])
  const [chosenRecipe, setChosenRecipe] = useState({})
  const lastSearchPromise = useRef(null)
  //google calendar event variables 
  const [startDateTime, setStartDateTime] = useState()
  const [endDateTime, setEndDateTime] = useState()
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function requests() {
      axios.get('http://localhost:3001/')
      .then(result => {
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

  const handleListDetails = (cat, subCat, subCatRecipes) => {
    setCategory(cat)
    setSubCategory(subCat)
    setSubCatRecipes(subCatRecipes)
  }

  const createList = () => {
    axios.post('http://localhost:3001/api/create-new-user-list', {"listName":userListName, "recipes":newListRecipes, "objectId":objectId})
      .then (res => {
        setUserLists(res.data.updatedUserLists)
      })
      .catch (e => console.log(e))
  }

  const handleOnSearchChange = (searchInput) => {
    if(searchInput === "") {
      return
    }
    let currPromise = axios.get(`http://localhost:3001/search/${searchInput}`)

    lastSearchPromise.current = currPromise

    currPromise.then (res => {
      if (lastSearchPromise.current === currPromise) {
        setSearchRecipes(res.data.recipes)
      } 
    })
    currPromise.catch (e => console.log(e))
  }

  const handleChooseRecipe = (recipe) => {
    setChosenRecipe(recipe)
  }

  const handleAddRecipe = (listName) => {
    axios.post('http://localhost:3001/api/add-recipe-to-user-list', {"recipe":chosenRecipe, "objectId":objectId, "listName":listName})
      .then (res => {
        setUserLists(res.data.updatedUserLists)
      })
      .catch (e => console.log(e))
  }

  const handleCreateCalendarEvent = async (summary,description,recipe) => {
    if(typeof endDateTime === "number") {
      let date = new Date(startDateTime) 
      let startMilliseconds = date.getTime()
      let totalMilliseconds = startMilliseconds + endDateTime*60000
      let newEndDate = new Date(totalMilliseconds)
      handleCreateCalendarEventPost(summary,description, newEndDate)
    } else {
      handleCreateCalendarEventPost(summary,description, endDateTime)
    }
  }

  const handleCreateCalendarEventPost = async (summary,description,endDate) => {
    axios.post('http://localhost:3001/api/create-event',{
      summary:summary,
      description:description,
      startDateTime: startDateTime, 
      endDateTime:endDate,
      objectId:objectId,
      access_token:accessToken,
      expiryDate:expiryDate
    })
      .then(res => {})
      .catch(e => console.log(e))
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar idToken={idToken} setIdToken={setIdToken} setAccessToken={setAccessToken} setExpiryDate={setExpiryDate} 
            setObjectId={setObjectId} setUserLists={setUserLists} setName={setName} setFirstName={setFirstName} setEmail={setEmail} 
            setSub={setSub} setSearchRecipes={setSearchRecipes} setCode={setCode}/>
          <Routes>
            <Route path="/" element={
              <div className='main-page'>
                <WelcomeBanner idToken={idToken} firstName={firstName} />
                <Home categorizedRecipes={categorizedRecipes} categories={categories} subCategories={subCategories} 
                    isFetching = {isFetching} setIsFetching = {setIsFetching} handleListDetails={handleListDetails}
                    idToken={idToken} userLists={userLists} setUserListName={setUserListName} createList={createList}
                    setNewListRecipes={setNewListRecipes} setChosenRecipe={setChosenRecipe} handleChooseRecipe={handleChooseRecipe}
                    newListRecipes={newListRecipes} handleAddRecipe={handleAddRecipe}/>
              </div>
            }/>
            <Route path="/list/:category/:listName" element={
              <div className='single-list'>
                <ListDetails categorizedRecipes={categorizedRecipes} category={category} subCategory={subCategory} subCatRecipes={subCatRecipes} 
                  pic={""} idToken={idToken} userLists={userLists} setNewListRecipes={setNewListRecipes} createList ={createList} setUserListName={setUserListName} 
                  handleAddRecipe={handleAddRecipe} setChosenRecipe={setChosenRecipe} setStartDateTime={setStartDateTime} setEndDateTime={setEndDateTime} 
                  handleCreateCalendarEvent={handleCreateCalendarEvent} endDateTime={endDateTime}/>
              </div>
            }/>
            <Route path="/search" element={
              <div className='search-page'>
                <Search handleOnSearchChange={handleOnSearchChange} searchRecipes={searchRecipes} setSearchRecipes={setSearchRecipes} setChosenRecipe={setChosenRecipe} 
                  handleChooseRecipe={handleChooseRecipe} userLists={userLists}  setNewListRecipes={setNewListRecipes} createList ={createList}
                  newListRecipes={newListRecipes} setUserListName={setUserListName} handleAddRecipe={handleAddRecipe} idToken={idToken} lastSearchPromise={lastSearchPromise} />
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
