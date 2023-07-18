import React, { useEffect, useRef, useState } from "react";
import { usersGet } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import "./AddTeamMemberModal.css"
import { DropDownMenu } from "../../context/Modal";


function AddTeamMemberModal({ projectId }) {
    const project = useSelector(state => state.projects[projectId]);
    const dispatch = useDispatch();
    const usersObj = useSelector(state => state.users);
    const [firstName, setFirstName] = useState("")
    const [chosenId, setChosenId] = useState(null)
    const [role, setRole] = useState("")
    const [admin, setAdmin] = useState(false)
    const [showSearch, setShowSearch] = useState(false);
    const ulRef = useRef()




    useEffect(() => {
        dispatch(usersGet());
    }, [dispatch])

    const openMenu = () => {
        if (showSearch) return;
        setShowSearch(true);
    };

    useEffect(() => {
        if (!showSearch) return;

        const closeMenu = (e) => {
            // If the area on the page clicked does not contain the value in ulRef.current, close the menu.
            if (!ulRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        };

        // if show menu is set to true, add a click listener to the entire document so it can close the menu when clicking outside the menu.
        const modal = document.getElementById("modal-content")
        modal.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showSearch]);

    const handleSubmit = () => {
        if (!chosenId) return

        const new_member = {
            userId: chosenId,
            projectId,
            role,
            admin
        }
    }
    const ulClassName = "search-dropdown" + (showSearch ? "" : " hidden");


    if (!Object.values(usersObj)) return null;
    let users = Object.values(usersObj)
    users = users.filter(user => user.firstName.toLowerCase().startsWith(firstName.toLowerCase()))
    users = users.filter(
        (user) => {
            return !Object.values(project.team).find(
                (member) => member.user.id === user.id
            )
        });
    users.sort((a, b) => {
        if (a.firstName < b.firstName) return -1
        return 1
    })

    return (
        <>
            <h1>Add a New Team Member</h1>
            <div>
                <input
                    type="text"
                    className="member-filter"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Search by first name"
                    onClick={openMenu}

                ></input>
                <ul className={ulClassName} ref={ulRef}>
                    {users.map(user => {
                        return (
                            <li key={user.id}>
                                {user.firstName} {user.lastName}
                            </li>
                        )
                    })}
                </ul>


            </div>
            <form onSubmit={handleSubmit} id="member-form">
                <label>
                    Role
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        minLength={4}
                        className="member-role"
                    />
                </label>
                <div className="member-admin">
                    <p>Admin</p>
                    <p className="admin-permissions">(Admins can add members, create, edit, and delete tasks, and assign tasks)</p>
                    <input type="checkbox" id="toggle" class="offscreen" onChange={() => setAdmin(!admin)} checked={admin} />
                    <label className="switch" htmlFor={`toggle`}></label>
                </div>
                <button className="login-form" type="submit">Add Team Member</button>

            </form>


        </>
    )
}

export default AddTeamMemberModal;