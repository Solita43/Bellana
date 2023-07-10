import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd"
import { taskPost, taskStatus } from "../../store/boardTasks";
import Portal from "../Portal";
import { TaskMenu } from "../../context/Modal";

function Task({ taskId, currentTask, setCurrentTask }) {
    const [coords, setCoords] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const task = useSelector(state => state.boardTasks[taskId]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});



    const changeStatus = (taskId) => {
        dispatch(taskStatus(taskId)).then(data => {
            if (data) {
                const err = { ...errors }
                err.status = data.error
                setErrors(err)
            }
        })
    }
    const showHandler = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        // const buttonbox = document.getElementById(`ellipse-${taskId}`);
        // if (buttonbox) {
        //     buttonbox.className = "hidden"
        // }
        if (showMenu) {
            return setShowMenu(false)
        }

        setCurrentTask(id);
        setShowMenu(true);

        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect)
        setCoords({
            left: rect.x,
            top: rect.y + 20 + window.scrollY
        });
    }

    const leaveHandler = (e) => {
        setCurrentTask(null);
        setShowMenu(false);
    }

    return (
        <>
            <div className="task-wrapper">
                <div className={task.status ? "task-complete" : "not-complete"}>
                    <i id={`check-${task.id}`} className="fa-solid fa-check" onClick={(e) => {
                        e.stopPropagation()
                        changeStatus(task.id)
                    }}></i>
                </div>
                <p className="task-details"> {task.details}</p>
                <button id={`ellipse-${task.id}`} className="hidden"
                    onClick={showHandler(task.id)}
                    onWheel={leaveHandler}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>

            </div>
            {showMenu && currentTask === task.id && (
                <TaskMenu top={coords.top} left={coords.left} onClose={(e) => {
                    e.stopPropagation()
                    const buttonbox = document.getElementById(`ellipse-${taskId}`);
                    if (buttonbox) {
                        buttonbox.className = "hidden"
                    }
                    setShowMenu(false)
                }}>
                    <ul className="task-dropdown" style={{ top: coords.top, left: coords.left }}>
                        <li className="task-li">
                            <i className="fa-solid fa-pen"></i> Edit Task
                        </li>
                    </ul>
                </TaskMenu>
            )}
            {/* {
                showMenu &&
                <Portal>
                    <div className={`task-dropdown task-${taskId}`} style={{ top: coords.top, left: coords.left, zIndex: '3', position: 'absolute' }} ref={taskRef}>
                        <ul>
                            <li className="task-li">
                                <i className="fa-solid fa-pen"></i> Edit Task
                            </li>
                        </ul>
                    </div>
                </Portal>
            } */}
        </>
    )
}
export default Task