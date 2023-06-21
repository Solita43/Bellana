import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";
import OpenModalButton from "../OpenModalButton";
import { orderUpdate, cardsGet } from "../../store/cards";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanPage.css'
import BoardDropdown from "./BoardDropdown";

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const cards = useSelector(state => state.cards[boardId])
    const [board, setBoard] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cardsGet(boardId));
    }, [dispatch])

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
        if (!result.destination) {
            return;
        }

        console.log("➡️➡️➡️RESULT!!!➡️➡️➡️", result)

        
        // Retrieve the necessary information from the result
        const { source, destination, draggableId } = result;
        
        console.log("➡️➡️➡️SOURCE!!!➡️➡️➡️", source)
        console.log("➡️➡️➡️Destination!!!➡️➡️➡️", destination)

        dispatch(orderUpdate(boardId, source.index, destination.index, draggableId));

        // Update your data based on the drag and drop result
        // ...
    };

    if (!board) return null;

    // Grab the cards for the board

    return (
        <div className="main-container">
            <div className="project-nav">
                <h2>{board.purpose}</h2>
                <BoardDropdown board={board} />

            </div>
            <div className="under-nav">
                <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided) => {
                        console.log("😒😒😒😒😒😒😒😒", provided)
                        return (
                        <div className="card-container" ref={provided.innerRef} {...provided.droppableProps} >
                                {cards && Object.values(cards).map((card, index) => {
                                    return (
                                    <Draggable key={card.id} draggableId={`${card.id}`} index={index}>
                                        {(provided) => (
                                                <div className="column-area">
                                <h4 className="card-category">{card.category}</h4>
                                <div className="card" key={card.id} ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                        <div className="card-info-wrapper">
                                        {Object.values(card.tasks).map(task => {
                                            return (
                                                <div className="kanban-task-container" onClick={handleClick}>
                                                    <p className="task-details"><i className="fa-regular fa-circle-check"></i> {task.details}</p>
                                                                    </div>
                                            )
                                        })}
                                        <button className="add-task" onClick={handleClick}><i className="fa-solid fa-plus"></i> Add new task</button>
                                                        </div>
                                </div>
                            </div>
                                        )}
                                    </Draggable>
                                    )
                                })}
                            </div>
                    )}
                    }
                </Droppable>
            </DragDropContext >
            </div>
        </div>
    );
}

export default KanbanPage;