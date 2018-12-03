import {CVSActionType} from '../reducers/cvs';
import * as axios from 'axios';

const parseCvResponse = (data) => {
    return {
        id: data.id,
        sections: data.attributes.sections || [],
        user: data.attributes.user,
        status: data.attributes.status,
    }
};

const loadCV = (id) => {
    return (dispatch) => {
        dispatch({type: CVSActionType.LOAD_CV_STARTED});

        const promise = axios.get(`/api/cvs/${id}`);

        promise.then(response => {
            const data = response.data && response.data.data;

            dispatch({
                type: CVSActionType.LOAD_CV_FINISHED, payload: {
                    cv: data && data.id && data.attributes ? parseCvResponse(data) : null
                }
            });
        });

        promise.catch(error => {
            console.error(error);
            dispatch({type: CVSActionType.LOAD_CVS_ERROR});
        });
    };
};

const loadCVs = () => {
    return (dispatch) => {
        dispatch({type: CVSActionType.LOAD_CVS_STARTED});

        const promise = axios.get('/api/cvs');

        promise.then(response => {
            dispatch({
                type: CVSActionType.LOAD_CVS_FINISHED, payload: {
                    cvs: (response.data.data || []).map(item => parseCvResponse(item))
                }
            });
        });

        promise.catch(error => {
            console.error(error);
            dispatch({type: CVSActionType.LOAD_CVS_ERROR});
        });
    };
};

const createCV = (data, callback) => {
    return (dispatch) => {
        dispatch({type: CVSActionType.LOAD_CV_STARTED});

        const promise = axios.post(`/api/cvs`, data);

        promise.then(() => {
            if (typeof(callback) === 'function') {
                callback(true);
            }

            dispatch({type: CVSActionType.LOAD_CV_FINISHED});
        });

        promise.catch(error => {
            if (typeof(callback) === 'function') {
                callback(false);
            }

            console.error(error);
            dispatch({type: CVSActionType.LOAD_CVS_ERROR});
        });
    };
};

const updateCV = (id, data, callback) => {
    return (dispatch) => {
        dispatch({type: CVSActionType.LOAD_CV_STARTED});

        const promise = axios.put(`/api/cvs/${id}`, data);

        promise.then(() => {
            if (typeof(callback) === 'function') {
                callback(true);
            }

            dispatch({type: CVSActionType.LOAD_CV_FINISHED});
        });

        promise.catch(error => {
            if (typeof(callback) === 'function') {
                callback(false);
            }

            console.error(error);
            dispatch({type: CVSActionType.LOAD_CVS_ERROR});
        });
    };
};

const removeCV = (id, callback) => {
    return (dispatch) => {
        dispatch({type: CVSActionType.LOAD_CV_STARTED});

        const promise = axios.delete(`/api/cvs/${id}`);

        promise.then(() => {
            if (typeof(callback) === 'function') {
                callback(true);
            }

            dispatch({type: CVSActionType.LOAD_CV_FINISHED});
        });

        promise.catch(error => {
            if (typeof(callback) === 'function') {
                callback(false);
            }

            console.error(error);
            dispatch({type: CVSActionType.LOAD_CVS_ERROR});
        });
    };
};

export default {loadCV, loadCVs, updateCV, removeCV, createCV}