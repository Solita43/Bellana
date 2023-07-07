const GET_TASKS = "boardTasks/GET_TASKS";
const ADD_TASK = "boardTasks/ADD_TASK";

const getTasks = (tasks) => ({
    type: GET_TASKS,
    payload: tasks
})

const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
})

export const boardTasksGet = (boardId) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${boardId}`);

    const data = await res.json();

    if (res.ok) {
        dispatch(getTasks(data))
    } else {
        return data
    }
}

export const taskColumOrderUpdate = (newOrder) => async (dispatch) => {
    const res = await fetch(`/api/tasks/dragged_different`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newOrder)
    })
    const data = await res.json()

    if(res.ok) {
        return data
    }
}

export const taskPost = (task, cardId) => async (dispatch) => {
    const res = await fetch(`/api/tasks/${cardId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(addTask(data));
        return data
    } else {
        return data;
    }
}

export const taskStatus = (taskId) => async (dispatch) => {
    const res = await fetch(`/api/tasks/status/${taskId}`, {
        method: "PUT"
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(addTask(data));
    } else {
        return data
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return action.payload
        case ADD_TASK:
            return {...state, ...action.payload}
        default:
            return state
    }
}