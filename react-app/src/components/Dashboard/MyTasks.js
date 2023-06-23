import React from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";


function MyTasks() {
    const tasks = useSelector(state => state.myTasks)

    return (
        <div className="dash-projects">
            <h2 className="dash-projects-title">My Tasks</h2>
            <div className="projects-wrapper">
            <OpenModalButton onButtonClick={() => window.alert("Feature coming soon...")} className="create-project-dash" buttonText={<><i className="fa-solid fa-plus home"></i> Create Task</>} />
            {Object.values(tasks).map(task => {
                return (
                    <div className="task-container" key={task.id} onClick={() => window.alert("Feature coming soon...")}>
                        {/* <div className="project-icon" onClick={() => history.push(`/project/${project.id}`)}>
                            <i className="fa-solid fa-diagram-project"></i>
                        </div> */}
                        <h3 className="dash-p-name">{task.details}</h3>
                        {/* <div className="dash-project-menu">
                            <ProjectDropdown projectId={project.id} projectName={project.name} buttonIcon={buttonIcon} />
                        </div> */}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default MyTasks;