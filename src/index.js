import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import AppRouter from './AppRouter';
import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './model/reducers';
import thunk from 'redux-thunk';
import './axios-bootstrap';

const middlewares = [];
let activateReduxLog = true;

if (process.env.NODE_ENV === `development` && activateReduxLog) {
    const {logger} = require(`redux-logger`);
    middlewares.push(logger);
}

// ## Thunk middleware (Async redux actions)
middlewares.push(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(...middlewares),
));

ReactDOM.render(
    <AppRouter store={store}/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
