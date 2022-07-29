import "./WelcomeBanner.css"
import * as React from "react"

export default function WelcomeBanner(props) {
    return (
      <div className="banner">
        {props.idToken === "" ?  
          <div>
            <h1 className="welcome-text">Welcome! </h1>
            <h1 className="welcome-text">Welcome! </h1>
          </div>
        : 
          <div>
            <h1 className="welcome-text">Welcome {props.firstName}! </h1>
            <h1 className="welcome-text">Welcome {props.firstName}! </h1>
          </div>
        }
      </div>
    )
}