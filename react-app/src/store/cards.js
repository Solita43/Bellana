const ORDER_CHANGE = "cards/ORDER_CHANGE";

const updateOrder = (card) => ({
    type: ORDER_CHANGE,
    payload: card
});

export const orderUpdate = (cardId, order) => async (dispatch) => {
    const res = await fetch(`/api/cards/${cardId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order)
    })
    const data = await res.json()

    if(res.ok) {
        console.log("➡️➡️➡️➡️➡️➡️➡️➡️ DATA?", data)
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ORDER_CHANGE:
            return 
        default:
            return state;
    }
}