import { postBoard } from "./boards";

const GET_CARDS = "cards/GET_CARDS";
const CREATE_CARD = "cards/CREATE_CARD";
const UPDATE_CATEGORY = "cards/UPDATE_CATEGORY";

const getCards = (cards) => ({
    type: GET_CARDS,
    payload: cards
})

const createCard = (card) => ({
    type: CREATE_CARD,
    payload: card
})

export const updateCategory = (card) => ({
    type: UPDATE_CATEGORY,
    payload: card
})


export const cardsGet = (boardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/${boardId}`)

    const data = await res.json();

    if (res.ok) {
        dispatch(getCards(data));
        return data
    }
}

export const orderUpdate = (newOrder, boardId) => async (dispatch) => {
    const res = await fetch(`/api/cards/order/${boardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
    })
    const data = await res.json()

    if (res.ok) {
        dispatch(postBoard(data))
    }
}

export const categoryUpdate = (cardId, category) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(updateCategory(data))
    } else {
        return data;
    }
}

export const deleteCard = (cardId, columns) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(columns)
    })

    const data = await res.json()

    if (res.ok) {
        dispatch(getCards(data))
        return data
    }
}

export const cardPost = (card) => async (dispatch) => {
    const res = await fetch('/api/cards/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card)
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(postBoard(data.board))
        dispatch(createCard(data.card))
        return data
    } else {
        return data;
    }
}


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARDS:
            return { ...state, ...action.payload }
        case CREATE_CARD:
            const newState = { ...state, [action.payload.boardId]: { ...state[action.payload.boardId], [action.payload.id]: { ...action.payload } } }
            return newState
        case UPDATE_CATEGORY:
            return { ...state, [action.payload.boardId]: { ...state[action.payload.boardId], [action.payload.id]: { ...action.payload } } }
        default:
            return state;
    }
}