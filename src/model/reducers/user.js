import {UserStorage} from "../util/localStorage";

let currentUser = UserStorage.getUserData();

if (!currentUser || !currentUser.jwt || !currentUser.name || !currentUser.role) {
    currentUser = null;
    UserStorage.setUserData(null);
}

const initialState = {
    isLoading: false,
    user: UserStorage.getUserData(),
    userRequested: false,
    error: null,
};

export const UserActionType = {
    LOAD_USER_STARTED: 'LOAD_USER_STARTED',
    LOAD_USER_FINISHED: 'LOAD_USER_FINISHED',
    LOAD_USER_ERROR: 'LOAD_USER_ERROR',
    REGISTER_USER_STARTED: 'REGISTER_USER_STARTED',
    REGISTER_USER_FINISHED: 'REGISTER_USER_FINISHED',
    REGISTER_USER_ERROR: 'REGISTER_USER_ERROR',
    LOGOUT: 'LOGOUT',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UserActionType.LOAD_USER_STARTED:
            return {
                ...state,
                isLoading: true,
                userRequested: true
            };
        case UserActionType.LOAD_USER_FINISHED:
            let user = (action && action.payload && action.payload.user) || null;

            return {
                ...state,
                user,
                isLoading: false,
                error: null
            };
        case UserActionType.LOAD_USER_ERROR:
            let error = (action && action.payload && action.payload.error) || 'Error loading user';

            return {
                ...state,
                isLoading: false,
                error,
            };
        case UserActionType.LOGOUT:
            return {
                ...state,
                user: null,
                isLoading: false,
                error: null
            };
        case UserActionType.REGISTER_USER_STARTED:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case UserActionType.REGISTER_USER_FINISHED:
            return {
                ...state,
                isLoading: false,
            };
        case UserActionType.REGISTER_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: 'Erro ao registrar usuário',
            };
        default:
            return state;
    }
}