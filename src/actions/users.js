import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { saveUser } from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const NEW_USER = 'NEW_USER'

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

function addUser (user) {
    return {
        type: NEW_USER,
        user,
    }
}

export function handleAddUser (info) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveUser(info)
        .then((user) => dispatch(addUser(user)))
        .then(() => dispatch(hideLoading()))
    }
}