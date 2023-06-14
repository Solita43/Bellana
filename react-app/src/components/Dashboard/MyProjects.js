import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../CreateProjectModal";
import ProjectDropdown from "./ProjectDropdown";


function MyProjects({ projects }) {
    return (
        <div className="dash-projects">
            <OpenModalButton buttonText={<i className="fa-solid fa-plus"></i>} modalComponent={<CreateProjectModal />} />
            {Object.values(projects).map(project => {
                return (
                    <div className="project-container" key={project.id}>
                        <div className="project-icon">
                            <i className="fa-solid fa-diagram-project"></i>
                        </div>
                        <h3>{project.name}</h3>
                        <div className="dash-project-menu">
                            <ProjectDropdown projectId={project.id} projectName={project.name} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyProjects;