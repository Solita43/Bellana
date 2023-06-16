import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch} from "react-redux";
import { boardPost } from "../../store/boards";


function CreateBoardModal({projectId}) {
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [purpose, setPurpose] = useState("");
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(boardPost(projectId, {
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
            <h1>Create a New Board</h1>
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
                <button type="submit">Create Board</button>
            </form>
        </>
    )
}

export default CreateBoardModal;