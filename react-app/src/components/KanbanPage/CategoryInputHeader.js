import React, { useState, useRef, useEffect } from 'react';
import { categoryUpdate } from '../../store/cards';
import { useDispatch } from 'react-redux';

function CategoryInputHeader({ column, props }) {
    const [category, setCategory] = useState(column.category);
    const dispatch = useDispatch();
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

    const menuClass = column.id + " dropdown" + (showMenu ? "" : " hidden ")

    const handleInputBlur = () => {
        if (category === column.category) return;
        // Send the updated information to the database
        dispatch(categoryUpdate(column.id, { category }))
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Send the updated information to the database
            event.preventDefault();
            event.target.blur();
        }
    };


    return (
        <div className="input-header-container" {...props}>
            <div className="input-header">
                <input
                    type="text"
                    value={category}
                    maxLength={20}
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={handleInputBlur}
                    onKeyPress={handleInputKeyPress}
                    className="card-category"
                    id={"category " + column.id}
                />
                <div className="dash-project-menu">
                    <div className="dropdown-icon" onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <ul className={menuClass} ref={ulRef}>
                        <li onClick={() => {
                            document.getElementById("category " + column.id).focus();
                            setShowMenu(false);
                        }}
                        style={{cursor: "pointer", color: 'var(--dull-white)', fontSize: ".8rem"}}>
                            <i className="fa-solid fa-pen"></i> Rename Section
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default CategoryInputHeader;
