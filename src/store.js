import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import reducer from './reducers/root';
const composeEnhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancer(applyMiddleware(thunk));

const initState = {
    user: {
        users: [],
        error: ''
    }
}

const store = createStore(reducer, initState, enhancer);

export default store;