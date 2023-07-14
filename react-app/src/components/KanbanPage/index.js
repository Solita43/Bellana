import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderUpdate, cardsGet, cardPost } from "../../store/cards";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanPage.css'
import BoardDropdown from "./BoardDropdown";
import TaskDrag from "./TaskDrag";
import { taskOrderUpdate } from "../../store/myTasks";
import { boardTasksGet, taskColumOrderUpdate } from "../../store/boardTasks";
import CategoryInputHeader from "./CategoryInputHeader";

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const cards = useSelector(state => state.cards);
    const tasks = useSelector(state => state.boardTasks)
    const [board, setBoard] = useState(null);
    const dispatch = useDispatch();
    const [columnOrder, setColumnOrder] = useState(null);
    const [columns, setColumns] = useState(null);
    const [tasksOrders, setTasksOrders] = useState(null);
    const [newCategory, setNewCategory] = useState("");
    const [inFocus, setInFocus] = useState(false);
    const [error, setError] = useState("");
    const [currentTask, setCurrentTask] = useState(null);


    useEffect(() => {
        dispatch(boardTasksGet(boardId))
        dispatch(cardsGet(boardId)).then(data => {
            const tasks = {}
            for (let column of Object.values(data[boardId])) {
                tasks[column.id] = column.tasks
            }
            setTasksOrders(tasks)
        })
        return () => {
            setColumnOrder(null)
            setColumns(null)
            setTasksOrders(null)
        }
    }, [boardId, dispatch])

    useEffect(() => {
        if (!board) return
        setColumnOrder(board.cards);
        setColumns(Object.values(cards[boardId]))
    }, [cards, boardId])

    useEffect(() => {
        if (!Object.values(boards).length) return
        // Grab the board
        setBoard(boards[projectId][boardId])
    }, [boards, projectId, boardId])

    useEffect(() => {
        if (inFocus) document.getElementById("add-section").focus()
    }, [inFocus])

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        // Retrieve the necessary information from the result
        const { source, destination } = result;

        if (result.type === "card") {
            // If the draggable was dropped in the same location it started do nothing
            if (source.index === destination.index) return;

            // Copy the order array for columns
            const newOrder = [...columnOrder];
            // Remove the id at the index of the source index
            const [moving] = newOrder.splice(source.index, 1);
            // Add the id back to the array at the destination index
            newOrder.splice(destination.index, 0, moving);

            // Set the new order of the columns so the frontend stays updated while the database updates
            setColumnOrder(newOrder)

            // Create an object with the new position as the key and the column id as the value to send to the api.
            const columns = {}
            for (let id in newOrder) {
                columns[id] = newOrder[id]
            }

            return dispatch(orderUpdate(columns));

        } else if (result.type === "task") {
            if (destination.droppableId === source.droppableId) {
                const taskArray = [...tasksOrders[source.droppableId]]
                const [moving] = taskArray.splice(source.index, 1)
                taskArray.splice(destination.index, 0, moving)

                const newTasksOrder = { ...tasksOrders }
                newTasksOrder[destination.droppableId] = [...taskArray]
                setTasksOrders(newTasksOrder)

                const tasks = {}
                for (let id in taskArray) {
                    tasks[taskArray[id]] = id
                }
                dispatch(taskOrderUpdate(tasks))
            } else {
                const taskArraySource = [...tasksOrders[source.droppableId]]
                const [moving] = taskArraySource.splice(source.index, 1)
                const taskArrayDestination = [...tasksOrders[destination.droppableId]]
                taskArrayDestination.splice(destination.index, 0, moving)

                const newTasksOrder = { ...tasksOrders }
                newTasksOrder[source.droppableId] = [...taskArraySource]
                newTasksOrder[destination.droppableId] = [...taskArrayDestination]

                setTasksOrders(newTasksOrder)

                const tasks = { [source.droppableId]: {}, [destination.droppableId]: {} }
                for (let id in taskArraySource) {
                    tasks[source.droppableId][taskArraySource[id]] = id
                }

                for (let id in taskArrayDestination) {
                    tasks[destination.droppableId][taskArrayDestination[id]] = id
                }


                dispatch(taskColumOrderUpdate(tasks))


            }
        }

    };

    const handleInputBlur = () => {
        // Send the updated information to the database
        if (newCategory.trim().length === 1) {
            setError("Must be 2 or more characters.");
            document.getElementById("add-section").focus()
            return
        }
        else {
            setError('')
            setInFocus(false)
            dispatch(cardPost({
                category: newCategory,
                boardId,
                order: columns.length
            })).then(() => setNewCategory(""))
        }
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    };

    if (!board || !cards || !columnOrder || !columns || !tasksOrders || !tasks) return null;

    return (
        <div className="task-main-container">
            <div className="project-nav">
                <h2 className="board-purpose-nav">{board.purpose}</h2>
                <BoardDropdown board={board} />

            </div>
            <div className="under-nav">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="column-droppable" direction="horizontal" type="card" >
                        {(provided) => {
                            return (
                                <div className="card-container" ref={provided.innerRef} {...provided.droppableProps}>
                                    {columnOrder.length && columnOrder.map((columnId, index) => {
                                        const column = columns.find((column) => column.id === columnId);
                                        if (!column) return null;
                                        return (

                                            <Draggable key={column.id} draggableId={`card-${column.id}`} index={index}>
                                                {(provided) => {
                                                    return (
                                                        <div className="column-area" key={column.id} ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <CategoryInputHeader props={provided.dragHandleProps} column={column} columns={columns} columnOrder={columnOrder} setColumnOrder={setColumnOrder} />
                                                            <div className="card">
                                                                <TaskDrag currentTask={currentTask} setCurrentTask={setCurrentTask} board={column.boardId} tasks={tasks} taskOrders={tasksOrders} setTasksOrders={setTasksOrders} column={column.id} />
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            </Draggable>

                                        )
                                    })}
                                    {columns.length < 4 && (
                                        <div className="add-section">
                                            <div className="category-container">
                                                {inFocus ? <input
                                                    type="text"
                                                    value={newCategory}
                                                    maxLength={20}
                                                    minLength={2}
                                                    onChange={(e) => setNewCategory(e.target.value)}
                                                    onBlur={handleInputBlur}
                                                    onKeyPress={handleInputKeyPress}
                                                    className="card-category"
                                                    id="add-section"
                                                    placeholder="New Column"

                                                /> :
                                                    (<h4 style={{ cursor: "pointer" }} onClick={() => setInFocus(true)} ><i className="fa-solid fa-plus"></i> Add Section</h4>)}
                                            </div>
                                            {error && <p className="errors" style={{textAlign: "left"}}>* {error}</p>}
                                        </div>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </DragDropContext >
            </div>
        </div>)

}

export default KanbanPage;