import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import WelcomeBanner from '../WelcomeBanner/WelcomeBanner';
import Navbar from '../Navbar/Navbar';
import './App.css';
import Home from '../Home/Home';
import NotFound from "../NotFound/NotFound"
import SingleList from "../SingleList/SingleList"

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <div className='main-page'>
                <WelcomeBanner />
                <Home />
              </div>
            }/>
            <Route path="/list/:listName" element={
              <div className='single-list'>
                <SingleList />
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