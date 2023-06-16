import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";
import OpenModalButton from "../OpenModalButton";

function KanbanPage() {
    const { boardId, projectId } = useParams();
    const boards = useSelector(state => state.boards);
    const [board, setBoard] = useState(null)

    useEffect(() => {
        if (!Object.values(boards).length) return
        setBoard(boards[projectId][boardId])
    }, [boards])

    const handleClick = (e) => {
        e.preventDefault();
        window.alert("Feature Coming Soon...")
    }

    if (!board) return null;

    return (
        <div className="main-container">
            <div>
                <div className="project-nav">
                    <h2>{board.purpose}</h2>
                    <OpenModalButton buttonText={<i className="fa-regular fa-trash-can"></i>} modalComponent={<DeleteBoardModal board={board} />} />
                    <OpenModalButton buttonText={<i className="fa-solid fa-pen"></i>} modalComponent={<EditBoardModal boardId={board.id} board={board} />} />
                    <button onClick={handleClick}>My Tasks</button>
                </div>
            </div>
        </div>
    );
}

export default KanbanPage;