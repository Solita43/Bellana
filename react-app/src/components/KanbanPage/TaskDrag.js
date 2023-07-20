import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd"
import { taskPost } from "../../store/boardTasks";
import Task from "./Task";
import { useParams } from "react-router-dom";

function TaskDrag({ board, column, currentTask, setCurrentTask, taskOrders, setTasksOrders }) {
    const {projectId} = useParams();
    const [inFocus, setInFocus] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [errors, setErrors] = useState({})
    const tasks = useSelector(state => state.boardTasks);
	const sessionUser = useSelector(state => state.session.user);
    const member = useSelector(state => state.projects[projectId].team[sessionUser.id]);

    // const taskOrder = useSelector(state => state.cards[board][column].tasks)

    const dispatch = useDispatch();



    useEffect(() => {
        if (inFocus) document.getElementById("add-task").focus()
        else return
    }, [inFocus])

    const handleInputBlur = () => {
        // Send the updated information to the database
        if (!newTask) return
        else {
            dispatch(taskPost({
                details: newTask,
            }, column)).then((data) => {
                const newOrders = {...taskOrders}
                newOrders[column] = data.card.tasks
                setTasksOrders(newOrders)
                setInFocus(false)
                setNewTask("")
            })

        }
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    };




    if (!taskOrders[column] || !taskOrders[column].length) {
        return (
            <Droppable droppableId={`${column}`} type="task">
                {(provided, snapshot) => {
                    return (
                        <>
                            <div className="card-info-wrapper" ref={provided.innerRef} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? '#f5c1c8' : 'var(--white-background)', paddingTop: "0" }}>
                                {provided.placeholder}
                            </div>
                            {inFocus ? (<div className="kanban-task-container"><i className="fa-regular fa-circle-check"></i><input
                                type="text"
                                value={newTask}
                                maxLength={255}
                                minLength={1}
                                onChange={(e) => setNewTask(e.target.value)}
                                onBlur={handleInputBlur}
                                onKeyPress={handleInputKeyPress}
                                className="task-details"
                                id="add-task"
                                placeholder="New Task"

                            /></div>) : null}
                            {member.owner || member.admin ? (<button className="add-task" onClick={() => setInFocus(true)}><i className="fa-solid fa-plus"></i> Add new task</button>): null}
                        </>
                    )
                }}
            </Droppable>

        )
    }
    return (
        <Droppable droppableId={`${column}`} type="task"  >
            {(provided, snapshot) => {
                return (
                    <div className="scroll-wrapper" id="scroll-wrapper">
                        <div className="card-info-wrapper" ref={provided.innerRef} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? '#f5c1c8' : 'var(--white-background)' }}>
                            {taskOrders[column].length && taskOrders[column].map((taskId, index) => {
                                return (
                                    <Draggable key={taskId} draggableId={`task-${taskId}`} index={index}>
                                        {(provided) => (
                                            <Task taskId={taskId} currentTask={currentTask} setCurrentTask={setCurrentTask} taskOrders={taskOrders} column={column} setTasksOrders={setTasksOrders} draggable={provided.draggableProps} dragHandle={provided.dragHandleProps} innerRef={provided.innerRef} index={index} />
                                        )}
                                    </Draggable>
                                )
                            })}

                            {provided.placeholder}
                        </div>
                        {inFocus ? (<div className="kanban-task-container"><i className="fa-regular fa-circle-check"></i><input
                            type="text"
                            value={newTask}
                            maxLength={255}
                            minLength={1}
                            onChange={(e) => setNewTask(e.target.value)}
                            onBlur={handleInputBlur}
                            onKeyPress={handleInputKeyPress}
                            className="task-details"
                            id="add-task"
                            placeholder="New Task"

                        /></div>) : null}

                        {member.owner || member.admin ? (<button className="add-task" onClick={() => setInFocus(true)}><i className="fa-solid fa-plus"></i> Add new task</button>): null}
                    </div>
                )
            }}

        </Droppable>
    )
}

export default TaskDrag;