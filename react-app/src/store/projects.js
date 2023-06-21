const GET_PROJECTS = "projects/GET_PROJECTS";
const ADD_PROJECT = "projects/ADD_PROJECTS";
const EDIT_PROJECT = "projects/EDIT_PROJECT";
const DELETE_PROJECT = "projects/DELETE_PROJECT";

const getProjects = (projects) => ({
    type: GET_PROJECTS,
    payload: projects
})

const postProject = (project) => ({
    type: ADD_PROJECT,
    payload: project
})

const putProject = (project) => ({
    type: EDIT_PROJECT,
    payload: project
})

const deleteProject = (projectId) => ({
    type: DELETE_PROJECT,
    payload: projectId
})

export const projectsGet = () => async (dispatch) => {
    const res = await fetch("/api/projects/my-projects")

    const data = await res.json()

    if (res.ok) {
        dispatch(getProjects(data))
    } else {
        return data
    }
}

export const projectPost = (project) => async (dispatch) => {
    const res = await fetch("/api/projects/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(postProject(data))
    } else {
        return data
    }
}

export const projectPut = (projectId, project) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(project)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(putProject(data))
    } else {
        return data
    }
}

export const projectDelete = (projectId) => async (dispatch) => {
    const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE"
    })

    const data = res.json();

    if(res.ok) {
        dispatch(deleteProject(projectId));
    } else {
        return data;
    }
}

export const resourceCreate = (projectId, resource) => async (dispatch) => {
    const res = await fetch(`/api/resources/${projectId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(resource)
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(putProject(data))
    } else {
        return data
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {...action.payload}
        case ADD_PROJECT:
            return {...state, ...action.payload}
        case EDIT_PROJECT:
            return {...state, ...action.payload}
        case DELETE_PROJECT:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default: 
            return state;        
    }
}