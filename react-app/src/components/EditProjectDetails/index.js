import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { projectPut } from "../../store/projects";


function EditProjectDetails({ projectId }) {
    const { closeModal } = useModal();
    const project = useSelector(state => state.projects[projectId])
    const [name, setName] = useState(project.name);
    const [details, setDetails] = useState(project.details);
    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length) return


        const project = {
            name,
            details
        }

        dispatch(projectPut(projectId, project)).then(data => {
            if (data) {
                setErrors(data)
            } else {
                closeModal();
            }
        })
    }

    return (
        <>
            <h1>Edit Project</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Project Title
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
                {errors && errors.name ? <p className="errors">* {errors.name}</p> : null}
                <label>
                    Project Details
                    <textarea
                        type="text"
                        value={details}
                        maxLength={500}
                        minLength={3}
                        onChange={(e) => {
                            if (e.target.value.length < 3 && e.target.value.length > 0) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.details = "Must be between 3 and 500 characters."
                                    return err;
                                })
                            } else {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    delete err.details;
                                    return err;
                                })
                            }
                            setDetails(e.target.value)
                        }}
                    />
                </label>
                {errors && errors.details ? <p className="errors">* {errors.details}</p> : null}
                <button type="submit">Edit Project</button>
            </form>
        </>
    )
}

export default EditProjectDetails;