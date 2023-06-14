import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { projectPost } from "../../store/projects";


function EditProjectDetails({projectId}) {
    const { closeModal } = useModal();
    const project = useSelector(state => state.projects[projectId])
    const [name, setName] = useState(project.name);
    const [details, setDetails] = useState(project.details);
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
            <h1>Sign Up</h1>
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
                        max={30}
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

export default EditProjectDetails;