import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskPost, taskStatus } from "../../store/boardTasks";
import { TaskMenu } from "../../context/Modal";

function Task({ taskId, currentTask, setCurrentTask }) {
    const [coords, setCoords] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const task = useSelector(state => state.boardTasks[taskId]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [editFocus, setEditFocus] = useState(false);
    const [taskdetail, setTaskDetail] = useState(task.details);

    useEffect(() => {
        if (!editFocus) return;

        document.getElementById('edit-task').focus();

    }, [editFocus])



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
        if (showMenu) {
            return setShowMenu(false)
        }

        setCurrentTask(id);
        setShowMenu(true);

        const rect = e.currentTarget.getBoundingClientRect();
        console.log(rect)
        setCoords({
            left: rect.x,
            top: rect.y + 25 + window.scrollY
        });
    }

    const leaveHandler = (e) => {
        e.stopPropagation();
        setCurrentTask(null);
        setShowMenu(false);
    }

    return (
        <>
            {editFocus ? (<><i className="fa-regular fa-circle-check"></i><input
                type="text"
                value={taskdetail}
                maxLength={255}
                minLength={1}
                onChange={(e) => setTaskDetail(e.target.value)}
                // onBlur={handleInputBlur}
                // onKeyPress={handleInputKeyPress}
                className="task-details"
                id="edit-task"
                placeholder="New Task"
                onFocus={e => e.target.select()}

            /></>) : (
                <div className="task-wrapper">
                    <div className={task.status ? "task-complete" : "not-complete"}>
                        <i id={`check-${task.id}`} className="fa-solid fa-check" onClick={(e) => {
                            e.stopPropagation()
                            const buttonbox = document.getElementById(`ellipse-${taskId}`);
                            if (buttonbox) {
                                buttonbox.className = "hidden"
                            }
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
            )}
            {/* <div className="task-wrapper">
                <div className={task.status ? "task-complete" : "not-complete"}>
                    <i id={`check-${task.id}`} className="fa-solid fa-check" onClick={(e) => {
                        e.stopPropagation()
                        const buttonbox = document.getElementById(`ellipse-${taskId}`);
                        if (buttonbox) {
                            buttonbox.className = "hidden"
                        }
                        changeStatus(task.id)
                    }}></i>
                </div>
                <p className="task-details"> {task.details}</p>
                <button id={`ellipse-${task.id}`} className="hidden"
                    onClick={showHandler(task.id)}
                    onWheel={leaveHandler}>
                    <i className="fa-solid fa-ellipsis"></i>
                </button>

            </div> */}
            {showMenu && currentTask === task.id && (
                <TaskMenu top={coords.top} left={coords.left} showMenu={showMenu} onClose={(e) => {
                    e.stopPropagation()
                    const buttonbox = document.getElementById(`ellipse-${taskId}`);
                    if (buttonbox) {
                        buttonbox.className = "hidden"
                    }
                    setShowMenu(false)
                }}>
                    <button className="task-ellipse-portal" style={{ top: coords.top - 25, left: coords.left + .5 }} onClick={leaveHandler}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul className="task-dropdown" style={{ top: coords.top, left: coords.left }}>
                        <li className="task-li"
                            style={{ borderBottom: 'hsla(0, 0%, 100%, 0.259) 0.01rem solid' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditFocus(true)
                            }}
                        >
                            <i className="fa-solid fa-pen"></i> Edit Task
                        </li>
                        <li className='delete-category task-li'>
                            <i className="fa-regular fa-trash-can"></i> Delete Task
                        </li>
                    </ul>
                </TaskMenu>
            )}
        </>
    )
}
export default Task