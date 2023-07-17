import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateResourceModal from "../CreateResourceModal";
import resourcesSVG from './resources.svg';
import { resourceDelete } from "../../store/projects";
import "./SingleProjectDash.css"
import { DropDownMenu } from "../../context/Modal";

function SingleProjectDash() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    const dispatch = useDispatch();
    const [currentMember, setCurrentMember] = useState(null)
    const [coords, setCoords] = useState({});
    const [showMenu, setShowMenu] = useState(false);

    if (!project) return null;


    const innerButton = (user) => {
        return `${user.firstName[0]}${user.lastName[0]}`
    }

    const handleDelete = (resourceId) => {
        dispatch(resourceDelete(resourceId))
    }

    const showHandler = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();

        setCurrentMember(id);
        setShowMenu(true);

        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + 45 + window.scrollY
        });
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
                    <div className="members-wrapper">
                    <OpenModalButton className="add-team-member" buttonText={<><i className="fa-solid fa-plus team"></i> Add a Member</>}  />
                        {Object.values(project.team).length && Object.values(project.team).map(member => {
                            return (
                                <>
                                    <div className="member-container"
                                        onClick={showHandler(member.id)}
                                    >
                                        <div id="profile-button">
                                            <p id="initials">{innerButton(member.user)}</p>
                                        </div>
                                        <div className="member-details">
                                            <p className="member-name">{member.user.firstName} {member.user.lastName}</p>
                                            <p className="member-role">{member.role ? member.role : member.owner ? "Project Owner" : "+ Add Role"}</p>
                                        </div>
                                        <div className="member-menu-container">
                                            <i className="fa-solid fa-angle-down"></i>
                                        </div>
                                        {showMenu && currentMember === member.id && (
                                            <DropDownMenu top={coords.top} left={coords.left} showMenu={showMenu} onClose={() => {
                                                setCurrentMember(null);
                                                setShowMenu(false)
                                            }}>
                                                <ul id={`member-menu-${member.id}`} className="member-menu" style={{ top: coords.top, left: coords.left }}>
                                                    <li className="member-menu-li"
                                                        style={{ borderBottom: 'hsla(0, 0%, 100%, 0.259) 0.01rem solid' }}
                                                    >
                                                        {member.role ? "Change Role" : "Add Role"}
                                                    </li>
                                                    <li className="member-menu-li" style={{ borderBottom: 'hsla(0, 0%, 100%, 0.259) 0.01rem solid' }}>
                                                        {member.owner ? null : "Set as Project Owner"}
                                                    </li>
                                                    <li className="member-menu-li">
                                                        Remove from project
                                                    </li>
                                                </ul>
                                            </DropDownMenu>
                                        )}
                                    </div>
                                </>
                            )
                        })}
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
                                                <a className="resource-link" href={resource.url} target="_blank" rel="noreferrer">
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
