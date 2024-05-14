import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import splash_collage from "../../assets/kanban-method-animate.svg";
import "./Splash.css";
import Navigation from "../Navigation";

function Splash({ isLoaded }) {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  if (user) history.push("/dashboard");

  return (
    <div className="splash">
      <Navigation isLoaded={isLoaded} splash={true} />
      <div className="main-content">
        <div className="about">
          <h2 className="about-title">
            Ditch the Chaos, Achieve More Together.
          </h2>
          <p className="about-p">
            Streamline workflows, boost team productivity, and hit deadlines
            with ease. Bellana is your one-stop shop for seamless project
            management.
          </p>
        </div>
        <div>
          <object
            data={splash_collage}
            type="image/svg+xml"
            className="splash-collage"
          ></object>
        </div>
      </div>
      <div className="social-network">
        <ul className="social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/melinda-cortez-3581b0139/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Solita43"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <p className="copyright">
              Copyright <i className="fa-regular fa-copyright"></i> 2023 Melinda
              Cortez
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Splash;
