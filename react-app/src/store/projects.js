const GET_PROJECTS = "projects/GET_PROJECTS"

const getProjects = (projects) => ({
    type: GET_PROJECTS,
    payload: projects
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

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {...action.payload}
        default: 
            return state;        
    }
}