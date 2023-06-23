import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderUpdate, cardsGet } from "../../store/cards";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanPage.css'
import BoardDropdown from "./BoardDropdown";
import TaskDrag from "./TaskDrag";
import { taskOrderUpdate } from "../../store/myTasks";
import { boardTasksGet, taskColumOrderUpdate } from "../../store/boardTasks";

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const cards = useSelector(state => state.cards[boardId]);
    const tasks = useSelector(state => state.boardTasks)
    const [board, setBoard] = useState(null);
    const dispatch = useDispatch();
    const [columnOrder, setColumnOrder] = useState(null);
    const [columns, setColumns] = useState(null);
    const [tasksOrders, setTasksOrders] = useState(null);

    useEffect(() => {
        dispatch(boardTasksGet(boardId))
        dispatch(cardsGet(boardId)).then(data => {
            setColumnOrder(Object.values(data[boardId]).map(column => column.id));
            setColumns(Object.values(data[boardId]))
            const tasks = {}
            for (let column of Object.values(data[boardId])) {
                tasks[column.id] = Object.values(column.tasks).map(task => task.id);
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
        if (!Object.values(boards).length) return
        // Grab the board
        setBoard(boards[projectId][boardId])
    }, [boards, projectId, boardId])

    const handleClick = (e) => {

        e.preventDefault();
        window.alert("Feature Coming Soon...")
    }

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

            return dispatch(orderUpdate(boardId, columns));

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

                const tasks = {[source.droppableId]:{}, [destination.droppableId]:{}}
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

    if (!board || !cards || !columnOrder || !columns || !tasksOrders || !tasks) return null;

    return (
        <div className="main-container">
            <div className="project-nav">
                <h2 className="board-purpose-nav">{board.purpose}</h2>
                <BoardDropdown board={board} />

            </div>
            <div className="under-nav">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="column-droppable" direction="horizontal" type="card" >
                        {(provided) => {
                            return (
                                <div className="card-container" ref={provided.innerRef} {...provided.droppableProps} >
                                    {columnOrder.length && columnOrder.map((columnId, index) => {
                                        const column = columns.find((column) => column.id === columnId);
                                        return (

                                            <Draggable key={column.id} draggableId={`card-${column.id}`} index={index}>
                                                {(provided) => {
                                                    return (
                                                        <div className="column-area" key={column.id} ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <h4 className="card-category"{...provided.dragHandleProps}>{column.category}</h4>
                                                            <div className="card">
                                                                <TaskDrag tasks={tasks} taskOrder={tasksOrders[column.id]} column={column.id} />
                                                                <button className="add-task" onClick={handleClick}><i className="fa-solid fa-plus"></i> Add new task</button>
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            </Draggable>

                                        )
                                    })}
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