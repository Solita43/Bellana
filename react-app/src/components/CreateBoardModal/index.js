import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { boardPost } from "../../store/boards";


function CreateBoardModal({ projectId }) {
    const { closeModal } = useModal();
    const boards = useSelector(state => state.boards[projectId])
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
                            } else if (Object.values(boards).filter(board => board.name === e.target.value).length){
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.name = "Board name must be unique to this project."
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
                        maxLength={150}
                        onChange={(e) => {
                            if (e.target.value.length < 4) {
                                setErrors(prev => {
                                    const err = { ...prev };
                                    err.purpose = "Purpose must be between 4 and 150 characters."
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