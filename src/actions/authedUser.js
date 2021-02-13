import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';

function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function handlesetAuthedUser (id) {
    return (dispatch) => {
        dispatch(showLoading())
        dispatch(setAuthedUser(id))
        dispatch(hideLoading())
    }
}