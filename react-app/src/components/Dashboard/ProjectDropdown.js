import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditProjectDetails from "../EditProjectDetails";
import DeleteProjectModal from "../DeleteProjectModal";

function ProjectDropdown( {projectId, projectName}) {
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

    const menuClass = projectId + " dropdown" + (showMenu ? "" : " hidden ")

    return (
        <>
            <div className="dropdown-icon" onClick={openMenu}>
                <i className="fa-solid fa-ellipsis"></i>
            </div>
            <ul className={menuClass + projectId} ref={ulRef}>
                <li>
                    <OpenModalButton buttonText="Edit details" onItemClick={closeMenu} modalComponent={<EditProjectDetails projectId={projectId} />} />
                </li>
                <li>
                    <OpenModalButton buttonText={(
                        <>
                            <i className="fa-regular fa-trash-can"></i>
                            <p>Delete Project</p>
                        </>
                    )} modalComponent={<DeleteProjectModal projectId={projectId} projectName={projectName} />} />
                </li>
            </ul>
        </>

    )
}

export default ProjectDropdown;