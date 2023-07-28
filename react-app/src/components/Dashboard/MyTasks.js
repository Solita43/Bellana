import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myTasksGet, taskStatus } from "../../store/myTasks";
import { useHistory } from "react-router-dom";


function MyTasks() {
    const tasks = useSelector(state => state.myTasks)
    const [focus, setFocus] = useState("upcoming");
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(myTasksGet())
    }, [])

    return (
        <div className="dash-projects">
            <h2 className="dash-projects-title">My Tasks</h2>
            {/* <div className="projects-wrapper"> */}
            {/* <OpenModalButton onButtonClick={() => window.alert("Feature coming soon...")} className="create-project-dash" buttonText={<><i className="fa-solid fa-plus home"></i> Create Task</>} /> */}
            <div>
                <ul className="dash-task-tabs">
                    <li className={focus === "upcoming" ? "tab-focus" : "tab"} onClick={() => setFocus("upcoming")} >
                        Upcoming
                    </li>
                    <li className={focus === "completed" ? "tab-focus" : "tab"} onClick={() => setFocus("completed")} >
                        Completed
                    </li>
                </ul>
            </div>
            <ul className="dash-task-list">
                {Object.values(tasks).filter(task => focus === "upcoming" ? !task.status : task.status).map(task => {
                    return (
                        <li key={task.id} className="dash-task" >
                            <div className={task.status ? "task-complete" : "not-complete"}>
                                <i id={`check-${task.id}`} className="fa-solid fa-check" onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch(taskStatus(task.id))
                                }}></i>
                            </div>
                            <p className="task-details">{task.details}</p>
                            <div className="task-project" style={{backgroundColor: `var(--${task.project.color})`}} onClick={() => history.push(`/project/${task.project.id}`)} >
                                <p>{task.project.name}</p>
                            </div>
                        </li>
                    )
                })}

            </ul>

        </div>
    )
}

export default MyTasks;