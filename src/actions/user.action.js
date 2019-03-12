import * as types from './user.action.constants';
import * as services from '../services/userService';

export const getUsersAction = () => {
    return (dispatch) => {
        return services.getUsers().then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.GET_USERS_SUCCESS,
                    users: response.data
                })
            }
        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: types.GET_USERS_FAIL,
                    error: "Get users failed"
                })
            }
        })
    }
}

export const addUserAction = (user) => {
    return (dispatch) => {
        return services.addUser(user).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: types.ADD_USER_SUCCESS,
                    user: response.data
                })
            }
        }).catch(error => {
            if (error.response) {
                dispatch({
                    type: types.ADD_USER_FAIL,
                    error: "Add user failed"
                })
            }
        })
    }
}

export const editUserAction = (id, user) => {
    return (dispatch) => {
        return services.editUser(id, user)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: types.EDIT_USER_SUCCESS,
                        user: user
                    })
                }
            }).catch(error => {
                if (error.response) {
                    dispatch({
                        type: types.EDIT_USER_FAIL,
                        error: "Edit user failed"
                    })
                }
            })
    }
}

export const deleteUserAction = (id) => {
    return (dispatch) => {
        return services.deleteUser(id)
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: types.DELETE_USER_SUCCESS,
                        id
                    })
                }
            }).catch(error => {
                if (error.response) {
                    dispatch({
                        type: types.DELETE_USER_FAIL,
                        error: "Delete user failed"
                    })
                }
            })
    }
}