import React, {useState} from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { memberDelete } from "../../store/projects";



function RemoveMemberModal({ member, projectName }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(memberDelete(member)).then(data => {
            if (data) {
                setError(data.error)
            } else {
                closeModal()
            }
        })
    }

    return (
        <>
            <h1 className="delete-form-title">Remove {member.user.firstName} {member.user.lastName} from {projectName}?</h1>
            <ul>
                {error && <p className="errors">* {error}</p>}
            </ul>
            <p className="owner-warning">This user will no longer have access to this project and will be unassigned from all assigned tasks.</p>
            <form onSubmit={handleSubmit} className="delete-form">
                <button id="cancel-button" onClick={closeModal}>Cancel</button>
                <button id="delete-button">Remove</button>
            </form>
        </>
    );
}

export default RemoveMemberModal;