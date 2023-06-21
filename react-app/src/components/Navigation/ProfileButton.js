import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // If the area on the page clicked does not contain the value in ulRef.current, close the menu.
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    // if show menu is set to true, add a click listener to the entire document so it can close the menu when clicking outside the menu.
    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const innerButton = () => {
    return `${user.firstName[0]}${user.lastName[0]}`
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-drop-container">
      <button id="profile-button" onClick={openMenu}>
        <p id="initials">{innerButton()}</p>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className="dd-info">{user.username}</li>
        <li className="dd-info">{user.email}</li>
        <li className="log-out">
          <button onClick={handleLogout} className="logout" ><i className="fa-solid fa-arrow-right"></i> Log Out</button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
