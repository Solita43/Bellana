const ORDER_CHANGE = "cards/ORDER_CHANGE";
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
    }
}

export const orderUpdate = (boardId, source, destination, cardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${boardId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            source, 
            destination,
            cardId
        })
    })
    const data = await res.json()

    if(res.ok) {
        dispatch(getCards(data));
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