import thunk from 'redux-thunk'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {auth as authReducer} from "./reducers/auth";


export const history = createBrowserHistory();

const middleware = routerMiddleware(history);

// - Reducers
let reducer = combineReducers({
    router: connectRouter(history),
    //reducers
    auth: authReducer,

});

const store = applyMiddleware(thunk, middleware)(createStore)(reducer);

export default store;
