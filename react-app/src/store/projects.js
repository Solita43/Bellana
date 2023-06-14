const GET_PROJECTS = "projects/GET_PROJECTS";
const ADD_PROJECT = "projects/ADD_PROJECTS";

const getProjects = (projects) => ({
    type: GET_PROJECTS,
    payload: projects
})

const postProject = (project) => ({
    type: ADD_PROJECT,
    payload: project
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

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {...action.payload}
        case ADD_PROJECT:
            return {...state, ...action.payload}
        default: 
            return state;        
    }
}