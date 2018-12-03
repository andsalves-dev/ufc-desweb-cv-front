const initialState = {
    isLoading: false,
    hasError: false,
    cvs: [],
    cv: null
};

export const CVSActionType = {
    LOAD_CV_STARTED: 'LOAD_CV_STARTED' ,
    LOAD_CV_FINISHED: 'LOAD_CV_FINISHED',
    LOAD_CV_ERROR: 'LOAD_CV_ERROR',
    LOAD_CVS_STARTED: 'LOAD_CVS_STARTED' ,
    LOAD_CVS_FINISHED: 'LOAD_CVS_FINISHED',
    LOAD_CVS_ERROR: 'LOAD_CVS_ERROR',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CVSActionType.LOAD_CV_STARTED:
        case CVSActionType.LOAD_CVS_STARTED:
            return {
                ...state,
                isLoading: true
            };
        case CVSActionType.LOAD_CV_FINISHED:
            let cv = (action && action.payload && action.payload.cv) || null;

            return {
                ...state,
                cv,
                isLoading: false,
                hasError: false,
            };
        case CVSActionType.LOAD_CVS_FINISHED:
            let cvs = (action && action.payload && action.payload.cvs) || [];

            return {
                ...state,
                cvs,
                isLoading: false,
                hasError: false,
            };
        case CVSActionType.LOAD_CV_ERROR:
        case CVSActionType.LOAD_CVS_ERROR:
            return {
                ...state,
                isLoading: false,
                hasError: true
            };
        default:
            return state;
    }
}