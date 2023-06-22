import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateResourceModal from "../CreateResourceModal";
import resourcesSVG from './resources.svg';
import { resourceDelete } from "../../store/projects";
import "./SingleProjectDash.css"

function SingleProjectDash() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    const dispatch = useDispatch();

    if (!project) return null;


    const innerButton = () => {
        return `${project.owner.firstName[0]}${project.owner.lastName[0]}`
    }

    const handleDelete = (resourceId) => {
        dispatch(resourceDelete(resourceId))
    }

    return (
        <div className="main-container">
            <div className="project-nav">
                <h2 className="single-project-title">{project.name} Dashboard</h2>

            </div>
            <div className="under-nav">
                <div className="context-container">
                    <h3 className="context-title">Project Context</h3>
                    <div className="project-details-container">
                        <div style={{ opacity: "100%" }}>{project.details}</div>
                    </div>
                </div>
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
                    <h3 className="team-title">Project Resources</h3>
                    <div className="resources-wrapper">
                        {Object.values(project.resources).length ?
                            (
                                <>
                                    <OpenModalButton className="add-resource" buttonText={<i className="fa-solid fa-plus resource"></i>} modalComponent={<CreateResourceModal projectId={projectId} />} />
                                    {Object.values(project.resources).map(resource => {
                                        return (
                                            <div key={resource.id} className="resource-container">
                                                <a  className="resource-link" href={resource.url} target="_blank" rel="noreferrer">
                                                    <p className="resource-title">{resource.title}</p>
                                                </a>
                                                {/* <OpenModalButton buttonText={<i className="fa-solid fa-trash-can"></i>} modalComponent={<CreateResourceModal projectId={projectId} />} /> */}
                                                <i className="fa-solid fa-trash-can delete-resource" onClick={() => handleDelete(resource.id)}></i>
                                            </div>
                                        )

                                    })}
                                </>) :
                            (
                                <div className="no-resources">
                                    <img src={resourcesSVG} alt="pages" className="resource-icon"></img>
                                    <div className="explain-resources">
                                        <p>Add links to supporting resources for your project such as the github repo or wireframes.</p>
                                        <OpenModalButton className="add-first-resource" buttonText={<><i className="fa-solid fa-link"></i> Add links here!</>} modalComponent={<CreateResourceModal projectId={projectId} />} />
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SingleProjectDash;
