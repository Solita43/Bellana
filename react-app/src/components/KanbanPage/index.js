import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";
import OpenModalButton from "../OpenModalButton";
import './KanbanPage.css'

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const [board, setBoard] = useState(null)

    useEffect(() => {

        if (!Object.values(boards).length) return
        // Grab the board
        setBoard(boards[projectId][boardId])
    }, [boards, projectId, boardId])

    const handleClick = (e) => {

        e.preventDefault();
        window.alert("Feature Coming Soon...")
    }

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
            <div className="under-nav">
                <div className="card-container">
                    {cards && Object.values(cards).map(card => {
                        return (
                            <div className="card" key={card.id}>
                                <h4 className="card-category">{card.category}</h4>
                                <button className="add-task" onClick={handleClick}>Add new task</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default KanbanPage;