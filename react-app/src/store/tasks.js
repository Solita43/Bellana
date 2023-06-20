const GET_TASKS = "tasks/GET_TASKS";

const getTasks = (tasks) => ({
    type: GET_TASKS,
    payload: tasks
})

export const tasksGet = () => async (dispatch) => {
    const res = await fetch('/api/tasks/my_tasks');

    const data = await res.json();

    if (res.ok) {
        dispatch(getTasks(data))
    } else {
        return data
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return action.payload
        default:
            return state
    }
}