import {combineReducers} from 'redux';

import userReducer from './user';
import cvsReducer from './cvs';

export default combineReducers({
    userReducer,
    cvsReducer
});