import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import splash_collage from "./collage2.png"
import "./Splash.css"

function Splash() {
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    if (user) history.push('/dashboard');

    return (
        <div className="splash">
            {/* <img src={back} alt="svg-background"></img> */}
            <div className="about">
                <h2 className="about-title">Bellana brings all your tasks, teammates, and tools together.</h2>
                <p className="about-p">Make it easy for your team to focus on tasks at hand!</p>
            </div>
            <img src={splash_collage} alt="collage" className="splash-collage"></img>
            <div className="social-network">
                {/* <p className="about-links-header"> Meet the developer:</p> */}
                <ul className="social-icons">
                    <li>
                        <a href="https://www.linkedin.com/in/melinda-cortez-3581b0139/" target="_blank" rel='noreferrer'><i className="fa fa-linkedin"></i></a>
                    </li>
                    <li>
                        <a href="https://github.com/Solita43" target="_blank" rel='noreferrer'><i className="fa-brands fa-github"></i></a>
                    </li>
                    <li>
                        <p className="copyright">Copyright <i className="fa-regular fa-copyright"></i> 2023 Melinda Cortez</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Splash