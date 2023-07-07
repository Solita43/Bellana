import React, { useState, useRef, useEffect } from 'react';
import { categoryUpdate, deleteCard } from '../../store/cards';
import { useDispatch } from 'react-redux';


function CategoryInputHeader({ column, props, columns, setColumnOrder, columnOrder }) {
    const [category, setCategory] = useState(column.category);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [inFocus, setInFocus] = useState(false)
    const ulRef = useRef();


    useEffect(() => {
        if (inFocus) document.getElementById("category " + column.id).focus()
    }, [inFocus, column.id])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const handleDelete = () => {
         // Copy the order array for columns
         const newOrder = [...columnOrder];
         // Remove the id
         newOrder.splice(column.order, 1);
         console.log(column.order)
         // Set the new order of the columns so the frontend stays updated while the database updates
         setColumnOrder(newOrder)
         console.log("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬 ", newOrder)


         // Create an object with the new position as the key and the column id as the value to send to the api.
         const columns = {}
         for (let id in newOrder) {
             console.log("🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬🤬 ", id)
             columns[id] = newOrder[id]
         }

        dispatch(deleteCard(column.id, columns))

    }

    useEffect(() => {
        if (!showMenu || !column) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu, column]);

    if (!column) return null

    const closeMenu = () => setShowMenu(false);

    const menuClass = column.id + " dropdown" + (showMenu ? "" : " hidden ")

    const handleInputBlur = () => {
        if (category === column.category) return setInFocus(false);
        // Send the updated information to the database
        dispatch(categoryUpdate(column.id, { category })).then(() => {
            setInFocus(false)
        })
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    };


    return (
        <div className="input-header-container" {...props}>
            <div className="input-header">
                <div className='category-container'>
                    {inFocus ? <input
                        type="text"
                        value={category}
                        maxLength={20}
                        onChange={(e) => setCategory(e.target.value)}
                        onBlur={handleInputBlur}
                        onKeyPress={handleInputKeyPress}
                        className="card-category"
                        id={"category " + column.id}
                    /> : <h4 onClick={() => {
                        setInFocus(true)

                    }}>{column.category}</h4>}
                </div>
                <div className="dash-project-menu">
                    <div className="dropdown-icon" onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <ul className={menuClass} ref={ulRef}>
                        <li onClick={() => {
                            setInFocus(true);
                            closeMenu();
                        }}
                            style={{ cursor: "pointer", color: 'var(--dull-white)', fontSize: ".75rem" }}>
                            <i className="fa-solid fa-pen"></i> Rename Section
                        </li>
                        <li onClick={() => {
                            handleDelete()
                        }}
                            className='delete-category'>
                            <i className="fa-regular fa-trash-can"></i> Delete Section
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    );
};

export default CategoryInputHeader;
