import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    response: null,
    message: null,
    error: null,
    loading: false
};

const loginStart = (state, action) => {
    return {
        ...state,
        error: false,
        loading: true
    };
}

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

const loginFailed = (state, action) => {
    return {
        ...state,
        response: action.response,
        message: action.message,
        error: action.error,
        loading: false
    };
}

const loginReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);
        default:
            return state;
    }
}

export default loginReducer;