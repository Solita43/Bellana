import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskPut, taskStatus, taskDelete } from "../../store/boardTasks";
import { DropDownMenu } from "../../context/Modal";
import { useParams } from "react-router-dom";


function Task({ taskId, currentTask, setCurrentTask, draggable, dragHandle, innerRef, setTasksOrders, taskOrders, column, index }) {
    const {projectId} = useParams();
    const [coords, setCoords] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const task = useSelector(state => state.boardTasks[taskId]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [editFocus, setEditFocus] = useState(false);
    const [taskdetail, setTaskDetail] = useState(task?.details);
    const sessionUser = useSelector(state => state.session.user);
    const member = useSelector(state => state.projects[projectId].team[sessionUser.id]);


    useEffect(() => {
        if (!editFocus) return;

        document.getElementById('edit-task').focus();

    }, [editFocus])

    const handleClick = (e) => {

        e.preventDefault();
        e.stopPropagation()
        window.alert("Feature Coming Soon...")
    }



    const changeStatus = (taskId) => {
        dispatch(taskStatus(taskId)).then(data => {
            console.log(data)
            if (data) {
                const err = { ...errors }
                err.status = data.error
                setErrors(err)
            }
        })
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        setCurrentTask(null);
        setShowMenu(false);
        dispatch(taskDelete(taskId)).then(() => {
            const newOrders = { ...taskOrders }
            newOrders[column] = [...newOrders[column]]
            newOrders[column].splice(index, 1)

            setTasksOrders(newOrders)
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
        setCoords({
            left: rect.x,
            top: rect.y + 25 + window.scrollY
        });
        
        document.addEventListener('scroll', (event) => {setShowMenu(false)});
    }

    const leaveHandler = (e) => {
        e.stopPropagation();
        setCurrentTask(null);
        setShowMenu(false);
    }

    const handleInputBlur = () => {
        // Send the updated information to the database
        if (!taskdetail || taskdetail.trim() === task.details) {
            return setEditFocus(false)
        }
        else {
            dispatch(taskPut(taskId, {
                details: taskdetail,
            })).then((data) => {
                setEditFocus(false)
            })

        }
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    };

    if (!task) return (<div key="null" ref={innerRef}
        {...draggable}
        {...dragHandle}></div>);

    return (
        <div key={taskId} className="kanban-task-container" ref={innerRef}
            {...draggable}
            {...dragHandle}
            onClick={handleClick}
            onMouseOver={() => {
                const buttonbox = document.getElementById(`ellipse-${taskId}`);
                if (buttonbox) {
                    buttonbox.className = "task-ellipse"
                }
            }}
            onMouseLeave={() => {
                const buttonbox = document.getElementById(`ellipse-${taskId}`);
                if (buttonbox) {
                    buttonbox.className = "hidden"
                }
            }}
            >
            {editFocus ? (<><i className="fa-regular fa-circle-check"></i><input
                type="text"
                value={taskdetail}
                maxLength={255}
                minLength={1}
                onChange={(e) => setTaskDetail(e.target.value)}
                onBlur={handleInputBlur}
                onKeyPress={handleInputKeyPress}
                className="task-details"
                onClick={(e) => e.stopPropagation()}
                id="edit-task"
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
                    {member.owner || member.admin ? (<button id={`ellipse-${task.id}`} className="hidden"
                        onClick={showHandler(task.id)}
                        onWheel={leaveHandler}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>): null}

                </div>
            )}
            {showMenu && currentTask === task.id && (
                <DropDownMenu top={coords.top} left={coords.left} showMenu={showMenu} onClose={() => {
                    const buttonbox = document.getElementById(`ellipse-${taskId}`);
                    if (buttonbox) {
                        buttonbox.className = "hidden"
                    }
                    setCurrentTask(null)
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
                                leaveHandler(e);
                                setEditFocus(true)
                            }}
                        >
                            <i className="fa-solid fa-pen"></i> Edit Task
                        </li>
                        <li className='delete-category task-li' onClick={handleDelete}>
                            <i className="fa-regular fa-trash-can"></i> Delete Task
                        </li>
                    </ul>
                </DropDownMenu>
            )}
        </div>
    )
}
export default Task