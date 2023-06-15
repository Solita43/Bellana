import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleProjectDash.css"

function SingleProjectDash() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);

    const handleClick = (e) => {
        e.preventDefault();
        window.alert("Feature Coming Soon...")
    }

    if (!project) return null;

    const innerButton = () => {
        return `${project.owner.firstName[0]}${project.owner.lastName[0]}`
    }

    return (
        <div className="main-container">
            <div>
                <div className="project-nav">
                    <h2>{project.name} Dashboard</h2>
                    <button onClick={handleClick}>My Tasks</button>
                </div>
                <div className="project-details-container">
                    <div style={{ opacity: "100%" }}>{project.details}</div>
                </div>
                <div className="team-container">
                    <h3>Project Owner</h3>
                    <div className="member-list">
                        <div id="profile-button">
                            <p id="initials">{innerButton()}</p>
                        </div>
                        <p>{project.owner.firstName} {project.owner.lastName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleProjectDash;
