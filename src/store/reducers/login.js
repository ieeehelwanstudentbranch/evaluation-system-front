import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';
import handleresState from '../../utilize/reducersState';
const initialState = {
    token: null,
    userID: null,
    ...handleresState
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
        default:
            return state;
    }
}

export default loginReducer;