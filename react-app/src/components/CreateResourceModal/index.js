import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { resourceCreate } from "../../store/projects";

function CreateResourceModal({ projectId }) {
    const { closeModal } = useModal();
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length) return

        dispatch(resourceCreate(projectId, {
            title,
            url: url.includes("https://") ? url : "https://" + url
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
            <h1>Create a New Project</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Resource Title
                    <input
                        type="text"
                        value={title}
                        maxLength={30}
                        onChange={(e) => {
                            if (e.target.value.length < 4) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.title = "Title must be between 4 and 30 characters."
                                    return err;
                                })
                            } else {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    delete err.title;
                                    return err;
                                })
                            }
                            setTitle(e.target.value)
                        }}
                        required
                    />
                </label>
                {errors.title ? <p className="errors">* {errors.title}</p> : null}
                <label>
                    Resource Url
                    <textarea
                        type="url"
                        value={url}
                        maxLength={50}
                        minLength={7}
                        onChange={(e) => {
                            if (e.target.value.length < 7) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.url = "Must be between 7 and 50 characters."
                                    return err;
                                })
                            } else {
                                setErrors(prev => {
                                    const err = { ...prev }
                                    delete err.url;
                                    return err;
                                })
                            }
                            setUrl(e.target.value)
                        }}
                    />
                </label>
                {errors && errors.url ? <p className="errors">* {errors.url}</p> : null}
                <button type="submit" className="login-form">Add Resource</button>
            </form>
        </>
    )
}

export default CreateResourceModal;