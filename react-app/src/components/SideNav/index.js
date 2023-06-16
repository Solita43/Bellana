import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { boardsGet } from "../../store/boards";
import ProjectDropdown from "../Dashboard/ProjectDropdown";
import OpenModalButton from "../OpenModalButton";
import CreateBoardModal from "../CreateBoardModal";
import "./SideNav.css"

function SideNav() {
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    const boards = useSelector(state => state.boards[projectId])
    const dispatch = useDispatch();
    const history = useHistory();

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
                        <li key={board.id} onClick={() => history.push(`/project/${projectId}/${board.id}`)}>
                            {board.name}

                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default SideNav;