const GET_CARDS = "cards/GET_CARDS";

const getCards = (cards) => ({
    type: GET_CARDS,
    payload: cards
})

export const cardsGet = (boardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${boardId}`)

    const data = await res.json();

    if (res.ok) {
        dispatch(getCards(data));
        return data
    }
}

export const orderUpdate = (boardId, newOrder) => async (dispatch) => {
    const res = await fetch(`/api/cards/${boardId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newOrder)
    })
    const data = await res.json()

    if(res.ok) {
        return data
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARDS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}