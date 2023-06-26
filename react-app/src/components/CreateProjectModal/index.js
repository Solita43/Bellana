import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { projectPost } from "../../store/projects";
import {useHistory} from "react-router-dom"


function CreateProjectModal() {
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length) return

        dispatch(projectPost({
            name,
            details
        })).then(data => {
            if (data && data.errors) {
                setErrors(data)
            } else {
                history.push(`/project/${Object.keys(data)[0]}`)
                closeModal();
            }
        })

    }

    return (
        <>
            <h1>Create a New Project</h1>
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
                {errors.name ? <p className="errors">* {errors.name}</p> : null}
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
                <button type="submit" className="login-form">Create Project</button>
            </form>
        </>
    )
}

export default CreateProjectModal;