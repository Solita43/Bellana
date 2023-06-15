import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectsGet } from "../../store/projects";
import MyProjects from "./MyProjects";
import "./Dashboard.css"

function Dashboard() {
    const projects = useSelector(state => state.projects);
	const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(projectsGet())
    // }, [dispatch])

    return (
        <div className="dash-container">
            <h1>Welcome back, {sessionUser.username}</h1>
            <MyProjects projects={projects}/>
        </div>
    )
}

export default Dashboard;