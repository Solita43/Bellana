import React, {useState} from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { projectDelete } from "../../store/projects";



function DeleteProjectModal({ projectId, projectName }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null)


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(projectDelete(projectId)).then(data => {
            if (data) {
                setErrors(data.errors)
            } else {
                closeModal()
            }
        })
    }

    return (
        <>
            <h1>Delete the "{projectName}" Project?</h1>
            <ul>
                {errors && Object.values(errors).map((error, idx) => (
                    <li key={idx}>* {error}</li>
                ))}
            </ul>
            <p>This will delete the project along with any associated tasks.</p>
            <form onSubmit={handleSubmit}>
                <button id="cancel-button" onClick={closeModal}>Cancel</button>
                <button id="delete-button">Delete Project</button>
            </form>
        </>
    );
}

export default DeleteProjectModal;