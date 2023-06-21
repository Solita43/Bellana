import React, { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditBoardModal from "../EditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";

function BoardDropdown({ board }) {
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

    const menuClass = board.id + " dropdown" + (showMenu ? "" : " hidden ")

    return (
        <>
            <div className="dropdown-icon" onClick={openMenu}>
                <i className="fa-solid fa-ellipsis"></i>

                <ul className={menuClass} ref={ulRef}>
                    <li>
                        <OpenModalButton className="edit-button" onButtonClick={closeMenu} buttonText={<><i className="fa-solid fa-pen"></i> Edit Board Details</>} modalComponent={<EditBoardModal boardId={board.id} board={board} />} />
                    </li>
                    <li>
                        <OpenModalButton className="delete-button" onButtonClick={closeMenu} buttonText={<><i className="fa-regular fa-trash-can"></i> Delete Board</>} modalComponent={<DeleteBoardModal board={board} />} />
                    </li>
                </ul>
            </div>
        </>

    )
}

export default BoardDropdown;