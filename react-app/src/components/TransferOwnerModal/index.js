import React, {useState} from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { memberOwnerPut } from "../../store/projects";
import "./TransferOwnerModal.css"



function TransferOwnerModal({ member, projectName }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(memberOwnerPut(member.id)).then(data => {
            if (data) {
                setError(data.error)
            } else {
                closeModal()
            }
        })
    }

    return (
        <>
            <h1 className="delete-form-title">Transfer ownership to {member.user.firstName} {member.user.lastName}?</h1>
            <ul>
                {error && <p className="errors">* {error}</p>}
            </ul>
            <p className="owner-warning">This action cannot be undone. You will lose all owner permissions on <span style={{fontWeight: "bold"}}>{projectName}</span>.</p>
            <form onSubmit={handleSubmit} className="delete-form">
                <button id="cancel-button" onClick={closeModal}>Cancel</button>
                <button id="transfer-button">Transfer</button>
            </form>
        </>
    );
}

export default TransferOwnerModal;