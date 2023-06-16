import React, {useState} from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { boardDelete } from "../../store/boards";



function DeleteBoardModal({ board }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)

    console.log(board)


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(boardDelete(board)).then(data => {
            if (data) {
                setErrors(data.errors)
            } else {
                closeModal()
            }
        })
    }

    return (
        <>
            <h1>Delete the "{board.name}" Board?</h1>
            <ul>
                {errors && Object.values(errors).map((error, idx) => (
                    <li key={idx}>* {error}</li>
                ))}
            </ul>
            <p>This will delete the Board along with any associated tasks.</p>
            <form onSubmit={handleSubmit}>
                <button id="cancel-button" onClick={closeModal}>Cancel</button>
                <button id="delete-button">Delete Board</button>
            </form>
        </>
    );
}

export default DeleteBoardModal;