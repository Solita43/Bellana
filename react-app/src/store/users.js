const GET_USERS = "users/GET_USERS";

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

export const usersGet = () => async (dispatch) => {
    const res =  await fetch('/api/users/')

    const data = await res.json()

    if (res.ok) {
        dispatch(getUsers(data))
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return { ...action.payload};
		default:
			return state;
	}
}