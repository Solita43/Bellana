import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskPut, taskStatus, taskDelete, taskAssign } from "../../store/boardTasks";
import { DropDownMenu, TaskActionTooltip } from "../../context/Modal";
import { useParams } from "react-router-dom";


function Task({ taskId, currentTask, setCurrentTask, draggable, dragHandle, innerRef, setTasksOrders, taskOrders, column, index }) {
    const { projectId } = useParams();
    const [coords, setCoords] = useState({});
    const [showMenu, setShowMenu] = useState(false);
    const task = useSelector(state => state.boardTasks[taskId]);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [editFocus, setEditFocus] = useState(false);
    const [taskdetail, setTaskDetail] = useState(task?.details);
    const sessionUser = useSelector(state => state.session.user);
    const project = useSelector(state => state.projects[projectId]);
    const [member, setMember] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [currentToolTip, setCurrentTooltip] = useState(null);
    const [showCompleteTooltip, setShowCompleteTooltip] = useState(false);
    const [showAssign, setShowAssign] = useState(false);
    const [assignedName, setAssignedName] = useState("")
    const [chosenMember, setChosenMember] = useState(null);




    useEffect(() => {
        setMember(project.team[sessionUser.id])
    }, [project, sessionUser])


    useEffect(() => {
        if (!editFocus) return;
        document.getElementById('edit-task').focus();
    }, [editFocus])

    useEffect(() => {
        if (!task || !task.assignee) return setAssignedName("")
        setAssignedName(`${task.assignee.firstName} ${task.assignee.lastName}`)
    }, [task])

    const handleClick = (e) => {

        e.preventDefault();
        e.stopPropagation()
        window.alert("Feature Coming Soon...")
    }

    const innerButton = (user) => {
        return `${user.firstName[0]}${user.lastName[0]}`
    }

    const changeStatus = (taskId) => {
        dispatch(taskStatus(taskId)).then(data => {
            if (data) {
                const err = { ...errors }
                err.status = data.error
                setErrors(err)
            }
        })
    }

    const tooltipShowHandler = (assigned) => (e) => {
        e.preventDefault();
        if (showAssign || showMenu) return

        setCurrentTooltip(taskId)
        setShowTooltip(true);

        const rect = e.currentTarget.getBoundingClientRect();
        if (assigned === "assigned") {
            return setCoords({
                left: rect.x - 30,
                top: rect.y + 20 + window.scrollY
            });
        }
        setCoords({
            left: rect.x - 38.5,
            top: rect.y + 20 + window.scrollY
        });
    }

    const completeShowHandler = (status) => (e) => {
        e.preventDefault();
        if (showAssign || showMenu) return

        setCurrentTooltip(taskId)
        setShowCompleteTooltip(true)
        const rect = e.currentTarget.getBoundingClientRect();

        if (status === "incomplete") {
            setCoords({
                left: rect.x - 50.8,
                top: rect.y + 20 + window.scrollY
            });
        } else {
            setCoords({
                left: rect.x - 46.4,
                top: rect.y + 20 + window.scrollY
            });
        }

    }

    const tooltipLeaveHandler = (e) => {
        if (e.type !== 'wheel') e.preventDefault();
        setCurrentTooltip(null);
        setShowTooltip(false);
        setShowCompleteTooltip(false);
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
        setShowTooltip(false)
        setShowAssign(false)
        setCurrentTask(id);
        setShowMenu(true);

        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + 25 + window.scrollY
        });

        document.addEventListener('scroll', (event) => { setShowMenu(false) });
    }

    const assignShowHandler = (id) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (showAssign) {
            return setShowAssign(false)
        }

        setShowTooltip(false)
        setShowMenu(false)

        setCurrentTask(id);
        setShowAssign(true);

        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            left: rect.x -10,
            top: rect.y + 20 + window.scrollY
        });

    }

    const assignLeaveHandler = (e) => {
        e.stopPropagation();
        setCurrentTask(null);

    }

    const leaveHandler = (e) => {
        e.stopPropagation();
        setCurrentTask(null);
        setShowMenu(false);
        setShowAssign(false);
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

    const handleAssignKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (assignedName.trim().length === 0) {
                dispatch(taskAssign(taskId, { "userId": null })).then(data => {
                    setShowAssign(false)
                })
            } else {
                dispatch(taskAssign(taskId, { "userId": users[0].user.id })).then(data => {
                    setShowAssign(false)
                })
            }
        } else {
            return
        }
    }

    if (!task || !Object.values(project.team)) return (<div key="null" ref={innerRef}
        {...draggable}
        {...dragHandle}></div>);

    let users = Object.values(project.team)

    users = users.filter(user => user.user.firstName.toLowerCase().startsWith(assignedName.toLowerCase()))
    users.sort((a, b) => {
        if (a.user.firstName < b.user.firstName) return -1
        return 1
    })

    return (
        <div key={taskId} className="kanban-task-container" ref={innerRef}
            {...draggable}
            {...dragHandle}
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
            <div>
                {editFocus ? (
                    <div className="task-wrapper">
                        <i className="fa-regular fa-circle-check"></i>
                        <input
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

                        />
                    </div>
                ) : (
                    <div className="task-wrapper">
                        <div className={task.status ? "task-complete" : "not-complete"}
                            onMouseEnter={completeShowHandler(task.status ? "complete" : "incomplete")}
                            onMouseLeave={tooltipLeaveHandler}
                            onWheel={tooltipLeaveHandler}
                        >
                            <i id={`check-${task.id}`} className="fa-solid fa-check" onClick={(e) => {
                                const buttonbox = document.getElementById(`ellipse-${taskId}`);
                                if (buttonbox) {
                                    buttonbox.className = "hidden"
                                }
                                changeStatus(task.id)
                            }}></i>
                            {showCompleteTooltip && currentToolTip === taskId && (
                                <TaskActionTooltip top={coords.top} left={coords.left} onClose={() => setShowTooltip(false)}>
                                    <span className="tooltip" onMouseEnter={tooltipLeaveHandler}>{task.status ? "Mark as complete" : "Mark as incomplete"}</span>
                                </TaskActionTooltip>
                            )}
                        </div>
                        <p className="task-details"> {task.details}</p>
                        {member && (member.owner || member.admin) ? (
                            <button id={`ellipse-${task.id}`} className="hidden"
                                onClick={showHandler(task.id)}
                                onWheel={leaveHandler}>
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                        ) : null}

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
            <div className="assignee">
                {task.assignee ? (
                    <div className="assignee-initials"
                        onMouseEnter={tooltipShowHandler("assigned")}
                        onMouseLeave={tooltipLeaveHandler}
                        onWheel={tooltipLeaveHandler}
                        onClick={assignShowHandler(task.id)}
                    >
                        <p>{innerButton(task.assignee)}</p>
                    </div>
                ) : (
                    <div className="unassigned"
                        onMouseEnter={tooltipShowHandler("not")}
                        onMouseLeave={tooltipLeaveHandler}
                        onWheel={tooltipLeaveHandler}
                        onClick={assignShowHandler(task.id)}
                    >
                        <i className="fa-regular fa-user"></i>
                    </div>
                )}
                {showTooltip && currentToolTip === taskId && (
                    <TaskActionTooltip top={coords.top} left={coords.left} onClose={() => setShowTooltip(false)}>
                        <span className="tooltip">{task.assignee ? `${task.assignee.firstName} ${task.assignee.lastName}` : "Assign this task"}</span>
                    </TaskActionTooltip>
                )}
                {showAssign && currentTask === task.id && (
                    <DropDownMenu top={coords.top} left={coords.left} onClose={() => {
                        setCurrentTask(null);
                        setShowMenu(false);
                        setShowAssign(false);
                    }}>
                        <div className="assign-member" style={{ top: coords.top, left: coords.left }}>
                            <div className="assign-input">
                                <label htmlFor="member-assign" style={{ width: "100%" }} >
                                    Assignee
                                </label>
                                <input
                                    type="search"
                                    value={assignedName}
                                    onChange={(e) => setAssignedName(e.target.value)}
                                    onKeyPress={handleAssignKeyPress}
                                    placeholder="Search by name"
                                    id="member-assign"

                                ></input>
                            </div>
                            <div className="member-assign-ul">
                                <ul>
                                    {users.map(user => {
                                        return (
                                            <li key={user.user.id} className="member-assign-li" onClick={() => {
                                                dispatch(taskAssign(task.id, { "userId": user.user.id }))
                                                setShowAssign(false)
                                            }}>
                                                <div className="assignee-initials">
                                                    <p>{innerButton(user.user)}</p>
                                                </div>
                                                {user.user.firstName} {user.user.lastName}
                                            </li>
                                        )
                                    })}
                                </ul>

                            </div>
                        </div>
                    </DropDownMenu>
                )}
            </div>

        </div>
    )
}
export default Task