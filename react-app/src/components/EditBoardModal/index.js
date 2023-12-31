import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { boardPut } from "../../store/boards";


function EditBoardModal({ boardId, board }) {
    const { closeModal } = useModal();
    const boards = useSelector(state => state.boards[board.projectId])
    const [name, setName] = useState(board.name);
    const [purpose, setPurpose] = useState(board.purpose);
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length) return

        dispatch(boardPut(boardId, {
            name,
            purpose
        })).then(data => {
            if (data) {
                setErrors(data)
            } else {
                closeModal();
            }
        })

    }

    return (
        <>
            <h1>Edit Board Information</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Board Name
                    <input
                        type="text"
                        value={name}
                        maxLength={30}
                        onChange={(e) => {
                            if (e.target.value.length < 4) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.name = "Name must be between 4 and 30 characters."
                                    return err;
                                })
                            } else if (Object.values(boards).filter(board => board.name === e.target.value).length){
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.name = "Board name must be unique to this project."
                                    return err;
                                })
                            } else {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    delete err.name;
                                    return err;
                                })
                            }
                            setName(e.target.value)
                        }}
                        required
                    />
                </label>
                {errors.name ? <p className="errors">* {errors.name}</p> : null}
                <label>
                    What is the main purpose of the board?
                    <input
                        type="text"
                        value={purpose}
                        maxLength={100}
                        onChange={(e) => {
                            if (e.target.value.length < 4) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.purpose = "Purpose must be between 4 and 100 characters."
                                    return err;
                                })
                            } else {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    delete err.purpose;
                                    return err;
                                })
                            }
                            setPurpose(e.target.value)
                        }}
                        required
                    />
                </label>
                {errors.purpose ? <p className="errors">* {errors.purpose}</p> : null}
                <button type="submit" className="login-form">Edit Board</button>
            </form>
        </>
    )
}

export default EditBoardModal;