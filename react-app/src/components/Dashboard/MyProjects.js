import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../CreateProjectModal";
import { DropDownMenu } from "../../context/Modal";
import DeleteProjectModal from "../DeleteProjectModal";
import EditProjectDetails from "../EditProjectDetails";



function MyProjects({ projects }) {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [coords, setCoords] = useState({});

    const showHandler = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (showMenu) {
            return setShowMenu(false)
        }
        setCurrentProject(id);
        setShowMenu(true);

        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + 25 + window.scrollY
        });

        document.addEventListener('scroll', (event) => { setShowMenu(false) });
    }


    return (
        <div className="dash-projects">
            <h2 className="dash-projects-title">Projects</h2>
            <div className="projects-wrapper">
                <OpenModalButton className="create-project-dash" buttonText={<><i className="fa-solid fa-plus home"></i> Create Project</>} modalComponent={<CreateProjectModal />} />
                {Object.values(projects).map(project => {
                    return (
                        <div className="project-container" key={project.id} >
                            <div className="project-icon" style={{ backgroundColor: `var(--${project.color})` }} onClick={() => history.push(`/project/${project.id}`)}>
                                <i className="fa-solid fa-diagram-project"></i>
                            </div>
                            <h3 className="dash-p-name" onClick={() => history.push(`/project/${project.id}`)}>{project.name}</h3>
                            <div className="dash-project-menu">
                                <div className="dash-dropdown-icon" onClick={showHandler(project.id)}>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                                {showMenu && currentProject === project.id && (
                                    <DropDownMenu onClose={() => {
                                        setCurrentProject(null);
                                        setShowMenu(false);
                                    }} top={coords.top} left={coords.left}>
                                        <ul className="dash-project-dropdown dropdown"  style={{ top: coords.top, left: coords.left }} >
                                            <li>
                                                <OpenModalButton className="edit-button" buttonText={<><i className="fa-solid fa-pen"></i> Edit details</>} onButtonClick={() => {
                                                    setCurrentProject(null);
                                                    setShowMenu(false);
                                                }} modalComponent={<EditProjectDetails projectId={project.id} />} />
                                            </li>
                                            <li>
                                                <OpenModalButton
                                                    className="delete-button"
                                                    buttonText={(
                                                        <>
                                                            <i className="fa-regular fa-trash-can"></i>
                                                            <p>Delete Project</p>
                                                        </>
                                                    )} onButtonClick={() => {
                                                        setCurrentProject(null);
                                                        setShowMenu(false);
                                                    }} modalComponent={<DeleteProjectModal projectId={project.id} projectName={project.name} />} />
                                            </li>
                                        </ul>
                                    </DropDownMenu>)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyProjects;