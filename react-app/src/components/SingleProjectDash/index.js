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
            <div className="project-nav">
                <h2>{project.name} Dashboard</h2>
                <button onClick={handleClick}>My Tasks</button>
            </div>
            <div className="under-nav">
                <h3 className="context-title">Project Context</h3>
                <div className="project-details-container">
                    <div style={{ opacity: "100%" }}>{project.details}</div>
                </div>
                <div className="team-resources-wrapper">
                    <div className="team-container">
                        <h3 className="team-title">Project Team</h3>
                        <div className="member-container">
                            <div id="profile-button">
                                <p id="initials">{innerButton()}</p>
                            </div>
                            <div className="member-details">
                                <p className="member-name">{project.owner.firstName} {project.owner.lastName}</p>
                                <p className="member-role">Project Owner</p>
                            </div>
                        </div>
                    </div>
                    <div className="resources-container">
                        <h3>Project Resources</h3>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SingleProjectDash;
