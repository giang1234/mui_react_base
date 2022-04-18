import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { reducer as accountReducer } from './accounts';
import { reducer as authReducer } from './auth';
import { reducer as appReducer } from './app';

// gộp các reducer
const reducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    account: accountReducer,
});

const middleware = process.env.NODE_ENV !== 'production' ? [thunk] : [thunk];


const store = configureStore({
    reducer,
    middleware,
});

export default store;