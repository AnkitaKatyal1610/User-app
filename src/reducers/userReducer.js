import * as types from '../actions/user.action.constants';

const initState = {
    users: [],
    error: ''
}


export default (state = initState, action) => {
    switch (action.type) {
        case types.GET_USERS_SUCCESS:
            return Object.assign({}, state, { users: action.users });
        case types.GET_USERS_FAIL:
            return Object.assign({}, state, { error: action.error });
        case types.ADD_USER_SUCCESS:
            let { users } = state;
            users.unshift(action.user);
            return Object.assign({}, state, { users: [...users] });
        case types.ADD_USER_FAIL:
            return Object.assign({}, state, { error: action.error });
        case types.EDIT_USER_SUCCESS:
            let usersEdit = state.users;
            let i = usersEdit.findIndex(user => user.id === action.user.id)
            usersEdit[i] = action.user;
            return Object.assign({}, state, { users: [...usersEdit] });
        case types.EDIT_USER_FAIL:
            return Object.assign({}, state, { error: action.error });
        case types.DELETE_USER_SUCCESS:
            let usersDelete = state.users;
            let x = usersDelete.findIndex(user => user.id === action.id)
            usersDelete.splice(x, 1);
            return Object.assign({}, state, { users: [...usersDelete] });
        case types.DELETE_USER_FAIL:
            return Object.assign({}, state, { error: action.error });
        default:
            return state;
    }
}