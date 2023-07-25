import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditProjectDetails from "../EditProjectDetails";
import DeleteProjectModal from "../DeleteProjectModal";
import { useDispatch } from "react-redux";
import { colorPut } from "../../store/projects";
import { ColorMenu } from "../../context/Modal";



function ProjectDropdown({ projectId, projectName, buttonIcon }) {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const [showColorMenu, setShowColorMenu] = useState(false);
    const [colorCoords, setColorCoords] = useState({});
    const dispatch = useDispatch();
    const [currentProject, setCurrentProject] = useState(null);


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current || !ulRef.current.contains(e.target)) {
                setShowColorMenu(false);

                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const colorShowHandler = (id) => (e) => {
        e.preventDefault();

        setCurrentProject(id);
        setShowColorMenu(true);
        const rect = e.currentTarget.getBoundingClientRect();
        setColorCoords({
            left: rect.x + 116,
            top: rect.y + window.scrollY
        });

        document.addEventListener('scroll', (event) => { setShowMenu(false) });

    }

    const setColor = (projectId, color) => (e) => {
        e.stopPropagation()
        dispatch(colorPut(projectId, { color })).then((data) => {
            setCurrentProject(null);
            setShowColorMenu(false);
        })
    }

    const menuClass = projectId + " dropdown" + (showMenu ? "" : " hidden ")

    return (
        <div className="side-nav-menu">
            <div className="dropdown-icon" onClick={openMenu}>
                {buttonIcon}
            </div>
            <ul className={menuClass} ref={ulRef}>
                <li>
                    <OpenModalButton className="edit-button" buttonText={<><i className="fa-solid fa-pen"></i> Edit details</>} onButtonClick={closeMenu} modalComponent={<EditProjectDetails projectId={projectId} />} />
                </li>
                <li onMouseEnter={colorShowHandler(projectId)}>
                    <div className="set-color-li">
                        <p>Set Color</p>
                        {showColorMenu && currentProject === projectId && (
                            <ColorMenu left={colorCoords.left} top={colorCoords.top} onClose={() => setShowColorMenu(false)} >
                                <div className='color' style={{ backgroundColor: "var(--green)" }} onClick={setColor(projectId, "green")}></div>
                                <div className='color' style={{ backgroundColor: "var(--light-pink)" }} onClick={setColor(projectId, "light-pink")}></div>
                                <div className='color' style={{ backgroundColor: "var(--red)" }} onClick={setColor(projectId, "red")}></div>
                                <div className='color' style={{ backgroundColor: "var(--purple)" }} onClick={setColor(projectId, "purple")}></div>
                                <div className='color' style={{ backgroundColor: "var(--blue)" }} onClick={setColor(projectId, "blue")}></div>
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
                        )} onButtonClick={closeMenu} modalComponent={<DeleteProjectModal projectId={projectId} projectName={projectName} />} />
                </li>
            </ul>
        </div>

    )
}

export default ProjectDropdown;