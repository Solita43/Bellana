import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectsGet } from "../../store/projects";

function MyProjects() {
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    console.log(projects)

    useEffect(() => {
        dispatch(projectsGet())
    }, [])

    return (
        <div id="dash-projects">
            {Object.values(projects).map(project => {
                return (
                    <div className="project-container">
                        <div className="project-icon">
                            <i class="fa-solid fa-diagram-project"></i>
                        </div>
                        <h3>{project.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default MyProjects;