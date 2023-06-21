import React from "react";
import { useSelector } from "react-redux";
import MyProjects from "./MyProjects";
import MyTasks from "./MyTasks";
import "./Dashboard.css"

function Dashboard() {
    const projects = useSelector(state => state.projects);
    const sessionUser = useSelector(state => state.session.user);

    const event = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    const today = event.toLocaleDateString(undefined, options)

    return (
        <div className="dash-container">
            <div className="dash-welcome">
                <h2 className="dash-today">{today}</h2>
                <h1 className="dash-title">Welcome back, {sessionUser.username}!</h1>
            </div>
            <div className="dash-bubbles">
            <MyProjects projects={projects} />
            <MyTasks />
            </div>
        </div>
    )
}

export default Dashboard;