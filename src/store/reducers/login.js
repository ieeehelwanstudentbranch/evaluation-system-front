import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    token: null,
    response: null,
    message: null,
    error: null,
    loading: false
};

const loginSuccess = (state, action) => {
    return {
        ...state,
        token: `bearer ${action.token}`,
        response: action.response,
        message: action.message,
        error: null,
        loading: false
    };
}

const destroyToken = (state, action) => {
    return {
        ...state,
        token: null,
        loading: false
    };
}

const logoutSuccess = (state, action) => {
    return {
        ...state,
        error: action.error,
        message: action.message,
        token: null,
        loading: false
    };
}

const loginReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.serverErrorHandler(state, action);
        case actionTypes.DESTROY_TOKEN:
            return destroyToken(state, action);
        case actionTypes.LOGOUT_SUCCESS:
            return logoutSuccess(state, action);
        default:
            return state;
    }
}

export default loginReducer;