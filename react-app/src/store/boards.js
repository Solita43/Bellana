const GET_BOARDS = "boards/GET_BOARDS";
const POST_BOARD = "boards/POST_BOARD";
// const DELETE_BOARD = "boards/DELETE_BOARD"

const getBoards = (boards) => ({
    type: GET_BOARDS,
    payload: boards
})

const postBoard = (board) => ({
    type: POST_BOARD,
    payload: board
})

// const deleteBoard = (board) => ({
//     type: DELETE_BOARD,
//     payload: board
// })

export const boardsGet = (projectId) => async (dispatch) => {
    const res = await fetch(`/api/boards/${projectId}`);

    const data = await res.json();

    if (res.ok) {
        dispatch(getBoards({[projectId]: data}));
    } else {
        return data;
    }
}

export const boardPost = (projectId, board) => async (dispatch) => {
    const res = await fetch(`/api/boards/${projectId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(board)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(postBoard(data));
        return data.id
    } else {
        return {data};
    }
}

export const boardPut = (boardId, board) => async (dispatch) => {
    const res = await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(board)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(postBoard(data));
    } else {
        return data;
    }
}

export const boardDelete = (board) => async (dispatch) => {
    const res = await fetch(`/api/boards/${board.id}`, {
        method: "DELETE"
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(boardsGet(board.projectId));
    } else {
        return data;
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOARDS:
            return {...state, ...action.payload}
        case POST_BOARD:
            return {...state, [action.payload.projectId]: {...state[action.payload.projectId], [action.payload.id]: {...action.payload}}}
        default:
            return state
    }
}