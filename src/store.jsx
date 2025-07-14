import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '@root/redux/reducers';
// import logger from 'redux-logger'


const initialState = {};
const middleware = [thunk];
const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;



const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)),);


export default store;

