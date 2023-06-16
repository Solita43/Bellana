import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { boardsGet } from "../../store/boards";
import ProjectDropdown from "../Dashboard/ProjectDropdown";
import OpenModalButton from "../OpenModalButton";
import "./SideNav.css"
import CreateBoardModal from "../CreateBoardModal";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";

function SideNav() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    const boards = useSelector(state => state.boards[projectId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(boardsGet(projectId))
    }, [dispatch, projectId])

    if (!project) return <div className="side-container"></div>

    return (
        <div className="side-container">
            <div className="title-dropdown">
                <p>{project.name}</p>
                <ProjectDropdown projectId={projectId} projectName={project.name} buttonIcon={<i className="fa-solid fa-caret-down"></i>} />
            </div>
            <div className="nav-board-list">
                <h4 className="board-list-title">Boards</h4>
                <OpenModalButton buttonText={<i className="fa-solid fa-plus"></i>} modalComponent={<CreateBoardModal projectId={projectId} />} />
            </div>
            <ul>
                {boards && Object.values(boards).map(board => {
                    return (
                        <li key={board.id}>
                            {board.name}
                            <OpenModalButton buttonText={<i className="fa-regular fa-trash-can"></i>} modalComponent={<DeleteBoardModal board={board} />} />
                            <OpenModalButton buttonText={<i className="fa-solid fa-pen"></i>} modalComponent={<EditBoardModal boardId={board.id} board={board} />} />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default SideNav;