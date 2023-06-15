import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./SideNav.css"
import ProjectDropdown from "../Dashboard/ProjectDropdown";

function SideNav() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);

    if (!project) return <div className="side-container"></div>

    return (
        <div className="side-container">
            <div className="title-dropdown">
                <p>{project.name}</p>
                <ProjectDropdown projectId={projectId} projectName={project.name} buttonIcon={<i className="fa-solid fa-caret-down"></i>} />
            </div>
        </div>
    );
}

export default SideNav;