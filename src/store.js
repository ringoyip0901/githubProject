import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/reducers.js';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { fetchIssues } from "./actions/actions"

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;