import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderUpdate, cardsGet } from "../../store/cards";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanPage.css'
import BoardDropdown from "./BoardDropdown";
import TaskDrag from "./TaskDrag";

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const cards = useSelector(state => state.cards[boardId]);
    const [board, setBoard] = useState(null);
    const dispatch = useDispatch();
    const [columnOrder, setColumnOrder] = useState(null);
    const [columns, setColumns] = useState(null);






    useEffect(() => {
        dispatch(cardsGet(boardId)).then(data => {
            setColumns(Object.values(data[boardId]))
            setColumnOrder(Object.values(data[boardId]).map(column => column.id));
        })
        return () => {
            setColumnOrder(null)
            setColumns(null)
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

        console.log("RESULT", result)


        // Retrieve the necessary information from the result
        const { source, destination } = result;

        if (source.index === destination.index) return;

        if (result.type === "card"){
            const newOrder = [...columnOrder];
            const [moving] = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, moving);
    
            setColumnOrder(newOrder)
    
            const columns = {}
            for (let id in newOrder) {
                columns[id] = newOrder[id]
            }
    
            dispatch(orderUpdate(boardId, columns));
        }

        // Update your data based on the drag and drop result
        // ...
    };

    if (!board || !cards || !columnOrder || !columns) return null;

    // Grab the cards for the board

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
                                                            <TaskDrag tasks={column.tasks} column={column.id} />
                                                        </div>
                                                    </div>
                                                )}}
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