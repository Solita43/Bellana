import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import CreateProjectModal from "../CreateProjectModal";
import EditProjectDetails from "../EditProjectDetails";


function MyProjects({ projects }) {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const menuClass = "dash-project-dropdown" + (showMenu ? "" : " hidden")


    return (
        <div className="dash-projects">
            <OpenModalButton buttonText={<i className="fa-solid fa-plus"></i>} modalComponent={<CreateProjectModal />} />
            {Object.values(projects).map(project => {
                return (
                    <div className="project-container" key={project.id}>
                        <div className="project-icon">
                            <i className="fa-solid fa-diagram-project"></i>
                        </div>
                        <h3>{project.name}</h3>
                        <div className="dash-project-menu">
                            <div className="dropdown-icon" onClick={openMenu}>
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                            <ul className={menuClass} ref={ulRef}>
                                <li>
                                    <OpenModalButton buttonText="Edit details" onItemClick={closeMenu} modalComponent={<EditProjectDetails projectId={project.id} />} />
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyProjects;