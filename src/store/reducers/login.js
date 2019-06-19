import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    token: null,
    userID: null,
    message: null,
    error: null,
    loading: false
};

const loginSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        userID: action.userID,
        message: action.message,
        error: null,
        loading: false
    };
}
const loginFailed = (state, action) => {
    return {
        ...state,
        message: action.message,
        error: null,
        loading: false
    };
}

const logoutSuccess = (state, action) => {
    return {
        ...state,
        message: action.message,
        token: null,
        loading: false
    };
}

const logoutFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        message: action.message,
        loading: false
    };
}

const loginReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.serverErrorHandler(state, action);
        case actionTypes.LOGOUT_SUCCESS:
            return logoutSuccess(state, action);
        case actionTypes.LOGOUT_FAILED:
            return logoutFailed(state, action);
        default:
            return state;
    }
}

export default loginReducer;