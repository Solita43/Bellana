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

    const handleClick = (e) => {
        e.preventDefault();
        window.alert("Feature Coming Soon...")
    }

    if (!project) return <div className="side-container"></div>

    return (
        <div className="side-container">
            <div className="title-dropdown-side">
                <p className="dd-project-side-nav">{project.name}</p>
                <ProjectDropdown projectId={projectId} projectName={project.name} buttonIcon={<i className="fa-solid fa-caret-down"></i>} />
            </div>
            <div className="user-nav">
                <button onClick={() => history.push(`/project/${project.id}`)} className="project-home"><i className="fa-solid fa-house"></i> Project Home</button>
                <button onClick={handleClick} className="my-tasks"><i className="fa-regular fa-circle-check"></i> My Tasks</button>

            </div>
            <div className="nav-board-list">
                <h4 className="board-list-title"><i className="fa-solid fa-table-columns"></i> Boards</h4>
                <OpenModalButton className="create-board" buttonText={<i className="fa-solid fa-plus"></i>} modalComponent={<CreateBoardModal projectId={projectId} />} />
            </div>
            <ul>
                {boards && Object.values(boards).map(board => {
                    return (
                        <li className="board-list-name" key={board.id} onClick={() => history.push(`/project/${projectId}/${board.id}`)}>
                            {board.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default SideNav;