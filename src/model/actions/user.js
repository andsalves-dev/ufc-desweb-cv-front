import {UserActionType} from '../reducers/user';
import * as axios from "axios";
import {UserStorage} from "../util/localStorage";

const userLogin = (email, password) => {
    return (dispatch) => {
        dispatch({type: UserActionType.LOAD_USER_STARTED});

        const promise = axios.post('/api/session', {email, password});

        promise.then(response => {
            const data = response.data && response.data.data;

            if (data && data.attributes) {
                UserStorage.setUserData({
                    name: data.attributes.name,
                    email:data.attributes.email,
                    role: data.attributes.role || 'user',
                    cvId: data.attributes.cvs && data.attributes.cvs[0],
                    jwt: response.headers['x-api-key']
                });

                dispatch({
                    type: UserActionType.LOAD_USER_FINISHED, payload: {
                        user: UserStorage.getUserData()
                    }
                });
            } else {
                throw new Error('Unable to fetch user data');
            }
        });

        promise.catch(error => {
            let responseData = error.response && error.response.data;
            let errorMessage = 'Erro ao efetuar login';

            if (responseData && responseData.error && responseData.error.base) {
                errorMessage = responseData.error.base;
            }

            dispatch({
                type: UserActionType.LOAD_USER_ERROR, payload: {
                    error: errorMessage
                }
            });
        });
    };
};

const userRegister = (data, callback) => {
    return (dispatch) => {
        dispatch({type: UserActionType.REGISTER_USER_STARTED});

        const promise = axios.post('/api/registration', data);

        promise.then(() => {
            dispatch({type: UserActionType.REGISTER_USER_FINISHED});

            if (typeof(callback) === 'function') {
                callback(true);
            }
        });

        promise.catch(error => {
            let responseData = error.response && error.response.data;
            let errorMessage = 'Erro ao efetuar cadastro';

            if (responseData && responseData.error && responseData.error.base) {
                errorMessage = responseData.error.base;
            }

            dispatch({
                type: UserActionType.REGISTER_USER_ERROR, payload: {
                    error: errorMessage
                }
            });

            if (typeof(callback) === 'function') {
                callback(false);
            }
        });
    }
};

const userLogout = () => {
    UserStorage.setUserData(null);

    return (dispatch) => {
        dispatch({type: UserActionType.LOGOUT});
    };
};

export default {userLogin, userLogout, userRegister};