const GET_TASKS = "myTasks/GET_TASKS";

const getTasks = (tasks) => ({
    type: GET_TASKS,
    payload: tasks
})

export const myTasksGet = () => async (dispatch) => {
    const res = await fetch('/api/tasks/my_tasks');

    const data = await res.json();

    if (res.ok) {
        dispatch(getTasks(data))
    } else {
        return data
    }
}

export const taskOrderUpdate = (newOrder) => async (dispatch) => {
    const res = await fetch(`/api/tasks/dragged_same`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newOrder)
    })
    const data = await res.json()

    if(res.ok) {
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