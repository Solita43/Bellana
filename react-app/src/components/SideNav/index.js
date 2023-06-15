import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SideNav.css"
import ProjectDropdown from "../Dashboard/ProjectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { projectsGet } from "../../store/projects";

function SideNav() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!project) {
            dispatch(projectsGet())
        }
    }, [])

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