import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../CreateProjectModal";
import { ColorMenu, DropDownMenu } from "../../context/Modal";
import DeleteProjectModal from "../DeleteProjectModal";
import EditProjectDetails from "../EditProjectDetails";
import { useDispatch } from "react-redux";
import { colorPut } from "../../store/projects";



function MyProjects({ projects }) {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [coords, setCoords] = useState({});
    const [showColorMenu, setShowColorMenu] = useState(false);
    const [colorCoords, setColorCoords] = useState({});
    const dispatch = useDispatch();



    const showHandler = (id) => (e) => {
        e.preventDefault();
        if (showMenu) {
            return setShowMenu(false)
        }
        setCurrentProject(id);
        setShowMenu(true);

        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
            left: rect.x,
            top: rect.y + 25 + window.scrollY
        });

        document.addEventListener('scroll', (event) => { setShowMenu(false) });
    }

    const colorShowHandler = (e) => {
        e.preventDefault();

        setShowColorMenu(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setColorCoords({
            left: rect.x + 116,
            top: rect.y  + window.scrollY
        });

        document.addEventListener('scroll', (event) => { setShowMenu(false) });

    }

    const setColor = (projectId, color) => (e) => {
        dispatch(colorPut(projectId, {color}))
    }


    return (
        <div className="dash-projects">
            <h2 className="dash-projects-title">Projects</h2>
            <div className="projects-wrapper">
                <OpenModalButton className="create-project-dash" buttonText={<><i className="fa-solid fa-plus home"></i> Create Project</>} modalComponent={<CreateProjectModal />} />
                {Object.values(projects).map(project => {
                    return (
                        <div className="project-container" key={project.id} >
                            <div className="project-icon" style={{ backgroundColor: `var(--${project.color})` }} onClick={() => history.push(`/project/${project.id}`)}>
                                <i className="fa-solid fa-diagram-project"></i>
                            </div>
                            <h3 className="dash-p-name" onClick={() => history.push(`/project/${project.id}`)}>{project.name}</h3>
                            <div className="dash-project-menu">
                                <div className="dash-dropdown-icon" onClick={showHandler(project.id)}>
                                    <i className="fa-solid fa-ellipsis"></i>
                                </div>
                                {showMenu && currentProject === project.id && (
                                    <DropDownMenu onClose={() => {
                                        setCurrentProject(null);
                                        setShowMenu(false);
                                        setShowColorMenu(false);
                                    }} top={coords.top} left={coords.left}>
                                        <ul className="dash-project-dropdown dropdown" style={{ top: coords.top, left: coords.left }} >
                                            <li>
                                                <OpenModalButton className="edit-button" buttonText={<><i className="fa-solid fa-pen"></i> Edit details</>} onButtonClick={() => {
                                                    setCurrentProject(null);
                                                    setShowMenu(false);
                                                    setShowColorMenu(false);
                                                }} modalComponent={<EditProjectDetails projectId={project.id} />} />
                                            </li>
                                            <li onMouseEnter={colorShowHandler}>
                                                <div className="set-color-li">
                                                    <p>Set Color</p>
                                                    {showColorMenu && currentProject === project.id && (
                                                        <ColorMenu left={colorCoords.left} top={colorCoords.top} onClose={() => setShowColorMenu(false)} >
                                                            <div className='color' style={{backgroundColor: "var(--green)"}} onClick={setColor(project.id, "green")}></div>
                                                            <div className='color' style={{backgroundColor: "var(--light-pink)"}} onClick={setColor(project.id, "light-pink")}></div>
                                                            <div className='color' style={{backgroundColor: "var(--red)"}} onClick={setColor(project.id, "red")}></div>
                                                            <div className='color' style={{backgroundColor: "var(--purple)"}} onClick={setColor(project.id, "purple")}></div>
                                                            <div className='color' style={{backgroundColor: "var(--blue)"}} onClick={setColor(project.id, "blue")}></div>
                                                        </ColorMenu>
                                                    )}
                                                </div>
                                            </li>
                                            <li>
                                                <OpenModalButton
                                                    className="delete-button"
                                                    buttonText={(
                                                        <>
                                                            <i className="fa-regular fa-trash-can"></i>
                                                            <p>Delete Project</p>
                                                        </>
                                                    )} onButtonClick={() => {
                                                        setCurrentProject(null);
                                                        setShowMenu(false);
                                                        setShowColorMenu(false);
                                                    }} modalComponent={<DeleteProjectModal projectId={project.id} projectName={project.name} />} />
                                            </li>
                                        </ul>
                                    </DropDownMenu>)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyProjects;