import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";
import OpenModalButton from "../OpenModalButton";
import { orderUpdate } from "../../store/cards";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanPage.css'

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const [board, setBoard] = useState(null)
    const dispatch = useDispatch();

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

        dispatch(orderUpdate(+draggableId, destination.index));

        // Update your data based on the drag and drop result
        // ...
    };

    if (!board) return null;

    // Grab the cards for the board
    const cards = board.cards

    return (
        <div className="main-container">
            <div className="project-nav">
                <h2>{board.purpose}</h2>
                <OpenModalButton buttonText={<i className="fa-regular fa-trash-can"></i>} modalComponent={<DeleteBoardModal board={board} />} />
                <OpenModalButton buttonText={<i className="fa-solid fa-pen"></i>} modalComponent={<EditBoardModal boardId={board.id} board={board} />} />
                <button onClick={handleClick}>My Tasks</button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div className="card-container" ref={provided.innerRef} {...provided.droppableProps}>
                            {cards && Object.values(cards).map(card => {
                                return (
                                    <Draggable key={card.id} draggableId={`${card.id}`} index={card.order}>
                                        {(provided) => (
                                            <div className="card" key={card.id} ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <h4 className="card-category">{card.category}</h4>
                                                <button className="add-task" onClick={handleClick}>Add new task</button>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                        </div>
                    )
                    }
                </Droppable>
            </DragDropContext >
        </div>
    );
}

export default KanbanPage;