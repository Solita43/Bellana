import React from "react";
import { useSelector } from "react-redux";
import MyProjects from "./MyProjects";
import "./Dashboard.css"

function Dashboard() {
    const projects = useSelector(state => state.projects);
	const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="dash-container">
            <h1>Welcome back, {sessionUser.username}</h1>
            <MyProjects projects={projects}/>
        </div>
    )
}

export default Dashboard;