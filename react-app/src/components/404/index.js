import React from "react";
import errorGif from "./404.gif"
import "./404.css"

function PageNotFound() {
    return (
        <div className="error-container">
            <img src={errorGif} alt="error gif"  className="error-gif"></img>
            <h1 className="error-heading">Oops... You've entered uncharted territory!</h1>
        </div>
    )
}

export default PageNotFound