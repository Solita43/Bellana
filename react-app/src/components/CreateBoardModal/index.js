import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { boardPost } from "../../store/boards";


function CreateBoardModal({ projectId }) {
    const { closeModal } = useModal();
    const [name, setName] = useState("");
    const [purpose, setPurpose] = useState("");
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).length) return

        dispatch(boardPost(projectId, {
            name,
            purpose
        })).then(data => {
            if (data && data.errors) {
                setErrors(data.errors)
            } else {
                closeModal();
                history.push(`/project/${projectId}/${data}`)

            }
        })

    }

    return (
        <>
            <h1>Create a New Board</h1>
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
                        maxLength={50}
                        onChange={(e) => {
                            if (e.target.value.length < 4) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.purpose = "Name must be between 4 and 50 characters."
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
                <button type="submit" className="login-form">Create Board</button>
            </form>
        </>
    )
}

export default CreateBoardModal;