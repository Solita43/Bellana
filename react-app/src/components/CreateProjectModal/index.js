import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch} from "react-redux";
import { projectPost } from "../../store/projects";


function CreateProjectModal() {
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(projectPost({
            name,
            details
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
                    Project Title
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Project Details
                    <textarea
                        type="text"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Project</button>
            </form>
        </>
    )
}

export default CreateProjectModal;