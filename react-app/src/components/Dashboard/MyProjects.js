import React from "react";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../CreateProjectModal";
import ProjectDropdown from "./ProjectDropdown";


function MyProjects({ projects }) {
    const history = useHistory();

    const buttonIcon = (<i className="fa-solid fa-ellipsis"></i>);

    return (
        <div className="dash-projects">
            <h2 className="dash-projects-title">Projects</h2>
            <div className="projects-wrapper">
            <OpenModalButton className="create-project-dash" buttonText={<><i className="fa-solid fa-plus home"></i> Create Project</>} modalComponent={<CreateProjectModal />} />
            {Object.values(projects).map(project => {
                return (
                    <div className="project-container" key={project.id} >
                        <div className="project-icon" onClick={() => history.push(`/project/${project.id}`)}>
                            <i className="fa-solid fa-diagram-project"></i>
                        </div>
                        <h3 className="dash-p-name" onClick={() => history.push(`/project/${project.id}`)}>{project.name}</h3>
                        <div className="dash-project-menu">
                            <ProjectDropdown projectId={project.id} projectName={project.name} buttonIcon={buttonIcon} />
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default MyProjects;