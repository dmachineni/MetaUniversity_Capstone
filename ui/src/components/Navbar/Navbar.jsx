import * as React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import GoogleLogin from 'react-google-login'
import { gapi } from "gapi-script"
import {useEffect} from "react"
import axios from 'axios'

let clientId = '767127531223-tlkrjur0kj4h4ur074tkc02j97sbqv7p.apps.googleusercontent.com'
let logoImg = 'data:image/png;base64,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'

export default function Navbar(props) {
  const responseGoogle = async code => {
    props.setCode(code)
    axios.post('http://localhost:3001/api/create-tokens', {code})
      .then( async response =>  {
        props.setIdToken(response.data.tokens.id_token)
        props.setAccessToken(response.data.tokens.access_token)
        props.setExpiryDate(response.data.tokens.expiry_date)
        props.setUserLists(response.data.userLists)
        props.setName(response.data.name)
        props.setFirstName(response.data.firstName)
        props.setEmail(response.data.email)
        props.setSub(response.data.sub)
        props.setObjectId(response.data.objectId)
      })
      .catch(error => {console.log(error)})
  }

  const handleLogOut = () => {
    props.setIdToken("")
    props.setAccessToken("")
    props.setExpiryDate("")
    props.setUserLists([])
    props.setName("")
    props.setFirstName("")
    props.setEmail("")
    props.setSub("")
    props.setObjectId("")
  }

  const responseError = error => {
    console.log(error)
  }


  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="navbar">
        <div className="right"> 
          <Link to="/">
            <img className="logo-img" src={logoImg}></img>
          </Link>
        </div>
        <div className="left">
          <Link to="/">
            <h1 >Home</h1>
          </Link>
          <h1 >About Us</h1>
          <h1 >Contact Us</h1>
          <h1 >Calendar</h1>
          <Link to="/search">
            <h1>Search</h1>
          </Link>
          <h1 >
          {props.idToken === "" ?
            <div className="login">
              <GoogleLogin clientId={clientId} buttonText='Log in to get started!' onSuccess={responseGoogle} onFailure={responseError}
                cookiePolicy={'single_host_origin'} responseType="code" accessType="offline" scope="openid email profile https://www.googleapis.com/auth/calendar"/>
            </div>
            : 
            <button className="log-out button" onClick={handleLogOut}>Log Out</button>
          }
          </h1> 
        </div>
    </div>
  )
}
