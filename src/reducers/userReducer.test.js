import * as types from '../actions/user.action.constants';
import reducer from './userReducer';

describe('Tests for reducer', () => {
    it('has a default empty state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual({ users: [], error: '' })
    })

    it('can set fetched users in the state for action type GET_USERS_SUCCESS', () => {
        expect(reducer(undefined, {
            type: types.GET_USERS_SUCCESS, users: [{
                "id": 1,
                "email": "Amir.Gusikowski75@hotmail.com",
                "gender": "Female",
                "name": "Mrs. Muriel O'Reilly",
                "isDeleted": false,
                "createdAt": "2019-03-12T09:56:05.000Z",
                "updatedAt": "2019-03-12T11:29:02.000Z"
            }]
        })).toEqual({
            users: [{
                "id": 1,
                "email": "Amir.Gusikowski75@hotmail.com",
                "gender": "Female",
                "name": "Mrs. Muriel O'Reilly",
                "isDeleted": false,
                "createdAt": "2019-03-12T09:56:05.000Z",
                "updatedAt": "2019-03-12T11:29:02.000Z"
            }], error: ''
        })
    })

    it('can add user in the state for action type ADD_USER_SUCCESS', () => {
        expect(reducer(undefined, {
            type: types.ADD_USER_SUCCESS, user: {
                "id": 1,
                "email": "Amir.Gusikowski75@hotmail.com",
                "gender": "Female",
                "name": "Mrs. Muriel O'Reilly",
                "isDeleted": false,
                "createdAt": "2019-03-12T09:56:05.000Z",
                "updatedAt": "2019-03-12T11:29:02.000Z"
            }
        })).toEqual({
            users: [{
                "id": 1,
                "email": "Amir.Gusikowski75@hotmail.com",
                "gender": "Female",
                "name": "Mrs. Muriel O'Reilly",
                "isDeleted": false,
                "createdAt": "2019-03-12T09:56:05.000Z",
                "updatedAt": "2019-03-12T11:29:02.000Z"
            }], error: ''
        })
    })

    it('can add user in the state for action type EDIT_USER_SUCCESS', () => {
        expect(reducer(undefined, {
            type: types.EDIT_USER_SUCCESS, user: {
                "id": 1,
                "email": "Amir.Gusikowski75@hotmail.com",
                "gender": "Male",
                "name": "Mrs. Muriel O'Reilly",
                "isDeleted": false,
                "createdAt": "2019-03-12T09:56:05.000Z",
                "updatedAt": "2019-03-12T11:29:02.000Z"
            }
        })).toEqual({
            users: [{
                "id": 1,
                "email": "Amir.Gusikowski75@hotmail.com",
                "gender": "Male",
                "name": "Mrs. Muriel O'Reilly",
                "isDeleted": false,
                "createdAt": "2019-03-12T09:56:05.000Z",
                "updatedAt": "2019-03-12T11:29:02.000Z"
            }], error: ''
        })
    })

    it('can add user in the state for action type DELETE_USER_SUCCESS', () => {
        expect(reducer(undefined, {
            type: types.DELETE_USER_SUCCESS, id: 1
        })).toEqual({
            users: [], error: ''
        })
    })
    it('can add user in the state for action type GET_USERS_FAIL', () => {
        expect(reducer(undefined, {
            type: types.GET_USERS_FAIL, error: 'Get users failed'
        })).toEqual({
            users: [], error: 'Get users failed'
        })
    })
    it('can add user in the state for action type ADD_USER_FAIL', () => {
        expect(reducer(undefined, {
            type: types.ADD_USER_FAIL, error: 'Add user failed'
        })).toEqual({
            users: [], error: 'Add user failed'
        })
    })
    it('can add user in the state for action type EDIT_USER_FAIL', () => {
        expect(reducer(undefined, {
            type: types.EDIT_USER_FAIL, error: 'Edit user failed'
        })).toEqual({
            users: [], error: 'Edit user failed'
        })
    })
    it('can add user in the state for action type DELETE_USER_FAIL', () => {
        expect(reducer(undefined, {
            type: types.DELETE_USER_FAIL, error: 'Delete user failed'
        })).toEqual({
            users: [], error: 'Delete user failed'
        })
    })
})