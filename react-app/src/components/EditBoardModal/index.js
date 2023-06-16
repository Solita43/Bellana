import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { boardPut } from "../../store/boards";


function EditBoardModal({ boardId, board }) {
    const { closeModal } = useModal();
    const [name, setName] = useState(board.name);
    const [purpose, setPurpose] = useState(board.purpose);
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(boardPut(boardId, {
            name,
            purpose
        })).then(data => {
            if (data) {
                setErrors(data.errors)
            } else {
                closeModal();
            }
        })

    }

    return (
        <>
            <h1>Create a New Project</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors && Object.values(errors).map((error, idx) => (
                        <li key={idx}>* {error}</li>
                    ))}
                </ul>
                <label>
                    Board Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    What is the main purpose of the board?
                    <textarea
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Edit Board</button>
            </form>
        </>
    )
}

export default EditBoardModal;