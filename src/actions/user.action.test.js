import configureMocKStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import { baseService } from '../services/baseService';
import * as userActions from './user.action';
import * as types from './user.action.constants';

let mockStore = configureMocKStore([thunk]);
let mockService = new MockAdapter(baseService);

describe('Tests for User actions', () => {
    //GET USERS
    it('can dispatch GET_USERS_SUCCESS action', () => {
        mockService.onGet('/users').reply(200, [{
            id: 1,
            email: 'Amir.Gusikowski75@hotmail.com',
            gender: 'Female',
            name: 'Mrs. Muriel O\'Reilly',
            isDeleted: false,
            createdAt: '2019-03-12T09:56:05.000Z',
            updatedAt: '2019-03-12T09:56:59.000Z'
        }])

        let expectedActions = [{
            type: types.GET_USERS_SUCCESS, users: [{
                id: 1,
                email: 'Amir.Gusikowski75@hotmail.com',
                gender: 'Female',
                name: 'Mrs. Muriel O\'Reilly',
                isDeleted: false,
                createdAt: '2019-03-12T09:56:05.000Z',
                updatedAt: '2019-03-12T09:56:59.000Z'
            }]
        }]

        const store = mockStore({ users: [], error: "" });
        return store.dispatch(userActions.getUsersAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('can dispatch GET_USERS_FAIL action', () => {
        mockService.onGet('/users').reply(400, {
            error: 'Get users failed.'
        })

        let expectedActions = [{ type: types.GET_USERS_FAIL, error: 'Get users failed' }];

        const store = mockStore({ users: [], error: '' });
        return store.dispatch(userActions.getUsersAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    //ADD USERS
    it('can dispatch ADD_USER_SUCCESS action', () => {
        let user = {
            email: 'Amir.Gusikowski75@hotmail.com',
            gender: 'Female',
            name: 'Mrs. Muriel O\'Reilly'
        }
        mockService.onPost('/user', user).reply(200, [{
            id: 1,
            email: 'Amir.Gusikowski75@hotmail.com',
            gender: 'Female',
            name: 'Mrs. Muriel O\'Reilly',
            isDeleted: false,
            createdAt: '2019-03-12T09:56:05.000Z',
            updatedAt: '2019-03-12T09:56:59.000Z'
        }])

        let expectedActions = [{
            type: types.ADD_USER_SUCCESS, user: [{
                id: 1,
                email: 'Amir.Gusikowski75@hotmail.com',
                gender: 'Female',
                name: 'Mrs. Muriel O\'Reilly',
                isDeleted: false,
                createdAt: '2019-03-12T09:56:05.000Z',
                updatedAt: '2019-03-12T09:56:59.000Z'
            }]
        }]

        const store = mockStore({ users: [], error: "" });
        return store.dispatch(userActions.addUserAction(user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('can dispatch ADD_USER_FAIL action', () => {
        let user = {
            email: 'Amir.Gusikowski75@hotmail.com',
            gender: 'Female',
            name: 'Mrs. Muriel O\'Reilly'
        }
        mockService.onPost('/user', user).reply(400, {
            error: 'Add user failed'
        })

        let expectedActions = [{ type: types.ADD_USER_FAIL, error: 'Add user failed' }];

        const store = mockStore({ users: [], error: '' });
        return store.dispatch(userActions.addUserAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    //EDIT USER
    it('can dispatch EDIT_USER_SUCCESS action', () => {
        let user = {
            id: 1,
            email: 'Amir.Gusikowski75@hotmail.com',
            gender: 'Female',
            name: 'Mrs. Muriel O\'Reilly',
            isDeleted: false,
            createdAt: '2019-03-12T09:56:05.000Z',
            updatedAt: '2019-03-12T09:56:59.000Z'
        }
        let id = 1;
        mockService.onPut(`/user/${id}`, user).reply(200, [1])

        let expectedActions = [{
            type: types.EDIT_USER_SUCCESS, user: {
                id: 1,
                email: 'Amir.Gusikowski75@hotmail.com',
                gender: 'Female',
                name: 'Mrs. Muriel O\'Reilly',
                isDeleted: false,
                createdAt: '2019-03-12T09:56:05.000Z',
                updatedAt: '2019-03-12T09:56:59.000Z'
            }
        }]

        const store = mockStore({ users: [], error: "" });
        return store.dispatch(userActions.editUserAction(id, user)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('can dispatch EDIT_USER_FAIL action', () => {
        let user = {
            id: 1,
            email: 'Amir.Gusikowski75@hotmail.com',
            gender: 'Female',
            name: 'Mrs. Muriel O\'Reilly',
            isDeleted: false,
            createdAt: '2019-03-12T09:56:05.000Z',
            updatedAt: '2019-03-12T09:56:59.000Z'
        }
        let id = 1;
        mockService.onPut(`/user${id}`, user).reply(400, {
            error: 'Edit user failed'
        })

        let expectedActions = [{ type: types.EDIT_USER_FAIL, error: 'Edit user failed' }];

        const store = mockStore({ users: [], error: '' });
        return store.dispatch(userActions.editUserAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    //DELETE USER
    it('can dispatch DELETE_USER_SUCCESS action', () => {
        let id = 1;
        mockService.onDelete(`/user/${id}`).reply(200, [1])

        let expectedActions = [{
            type: types.DELETE_USER_SUCCESS, id
        }]

        const store = mockStore({ users: [], error: "" });
        return store.dispatch(userActions.deleteUserAction(id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })

    it('can dispatch DELETE_USER_FAIL action', () => {
        let id = 1;
        mockService.onPut(`/user${id}`).reply(400, {
            error: 'Delete user failed'
        })

        let expectedActions = [{ type: types.DELETE_USER_FAIL, error: 'Delete user failed' }];

        const store = mockStore({ users: [], error: '' });
        return store.dispatch(userActions.deleteUserAction()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
