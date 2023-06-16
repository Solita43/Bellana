import React from "react";
import { useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import back from "./back.svg";
import splash_collage from "./collage2.png"
import "./Splash.css"

function Splash() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    if (user) history.push('/dashboard');

    return (
        <div className="splash" style={{backgroundColor: "var(--background-color)", width: "100%"}}>
            <img src={back} alt="svg-background"></img>
            <div className="about">
                <h2 className="about-title">Bellana brings all your tasks, teammates, and tools together.</h2>
                <p className="about-p">Make it easy for your team to focus on tasks at hand!</p>
            </div>
            <img src={splash_collage} alt="collage" className="splash-collage"></img>
        </div>
    )
}

export default Splash