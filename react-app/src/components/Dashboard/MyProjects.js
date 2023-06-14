import React from "react";
import OpenModalButton from "../OpenModalButton";

function MyProjects({ projects }) {

    return (
        <div className="dash-projects">
            <OpenModalButton buttonText={<i class="fa-solid fa-plus"></i>} />
            {Object.values(projects).map(project => {
                return (
                    <div className="project-container" key={project.id}>
                        <div className="project-icon">
                            <i className="fa-solid fa-diagram-project"></i>
                        </div>
                        <h3>{project.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default MyProjects;