import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import * as serviceWorker from './serviceWorker';
import AppRouter from './AppRouter';
import {applyMiddleware, compose, createStore} from 'redux';
import reducers from './model/reducers';
import thunk from 'redux-thunk';
import * as axios from "axios";
import {UserStorage} from "./model/util/localStorage";

dotenv.config();

axios.defaults.baseURL = String(process.env.REACT_APP_API_URL);

console.log("axios.defaults.baseURL", axios.defaults.baseURL );

axios.defaults.headers['post']['Content-Type'] = 'application/json';
axios.defaults.headers['get']['Content-Type'] = 'application/json';
axios.defaults.headers['patch']['Content-Type'] = 'application/json';
axios.defaults.headers['put']['Content-Type'] = 'application/json';
axios.defaults.headers['delete']['Content-Type'] = 'application/json';

const userData = UserStorage.getUserData();

if (userData && userData.jwt) {
    axios.defaults.headers['common']['X-Api-Token'] = userData.jwt;
}

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
