import { myTasksGet } from "./myTasks";

const GET_PROJECTS = "projects/GET_PROJECTS";
const ADD_PROJECT = "projects/ADD_PROJECTS";
const EDIT_PROJECT = "projects/EDIT_PROJECT";
const DELETE_PROJECT = "projects/DELETE_PROJECT";
const ADD_MEMBER = "projects/ADD_MEMBER";
const DELETE_MEMBER = "projects/DELETE_MEMBER";

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

const createMember = (member) => ({
    type: ADD_MEMBER,
    payload: member
})

const deleteMember = (member) => ({
    type: DELETE_MEMBER,
    payload: member
})

export const memberCreate = (member) => async (dispatch) => {
    const res = await fetch(`/api/team/project/${member.projectId}`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(member)
    })

    const data = await res.json()

    console.log(data)

    if (res.ok) {
        dispatch(createMember(data))
    }
}

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
        return data
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

export const resourceDelete = (resourceId) => async (dispatch) => {
    const res = await fetch(`/api/resources/${resourceId}`, {
        method: "DELETE"
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(putProject(data))
    } else {
        return data
    }
}

export const memberRolePut = (memberId, role) => async (dispatch) => {
    const res = await fetch(`/api/team/role/${memberId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(role)
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(createMember(data))
    } else {
        return data
    }
}

export const memberAdminPut = (memberId) => async (dispatch) => {
    const res = await fetch(`/api/team/admin/${memberId}`, {
        method: "PUT"
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(createMember(data))
    } else {
        return data
    }
}

export const memberOwnerPut = (memberId) => async (dispatch) => {
    const res = await fetch(`/api/team/transfer_owner/${memberId}`, {
        method: "PUT"
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(createMember(data.NewOwner))
        dispatch(createMember(data.OldOwner))
    } else {
        return data
    }
}

export const memberDelete = (member) => async (dispatch) => {
    const res = await fetch(`/api/team/${member.id}`, {
        method: "DELETE"
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(deleteMember(member))
    } else {
        return data
    }
}

export const colorPut = (projectId, color) => async (dispatch) => {
    const res = await fetch(`/api/projects/color/${projectId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(color)
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(myTasksGet())
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
        case ADD_MEMBER: 
            return {...state, [action.payload.projectId]: {...state[action.payload.projectId], team: {...state[action.payload.projectId].team, [action.payload.user.id]: {...action.payload}}}}
        case DELETE_MEMBER:
            const nextState = {...state, [action.payload.projectId]: {...state[action.payload.projectId], team: {...state[action.payload.projectId].team}}}
            delete nextState[action.payload.projectId].team[action.payload.user.id]
            return nextState
        default: 
            return state;        
    }
}