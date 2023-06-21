import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";
import OpenModalButton from "../OpenModalButton";
import './KanbanPage.css'
import BoardDropdown from "./BoardDropdown";

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
                <BoardDropdown board={board} />

            </div>
            <div className="under-nav">
                <div className="card-container">
                    {cards && Object.values(cards).map(card => {
                        return (
                            <div className="column-area">
                                <h4 className="card-category">{card.category}</h4>
                                <div className="card" key={card.id}>
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
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default KanbanPage;