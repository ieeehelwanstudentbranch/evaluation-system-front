import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';
const initialState = {
    token: null,
    userID: null,
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
        case actionTypes.LOGIN_START:
            return reducers.loadingHandler(state, action);
            
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);

        case actionTypes.LOGIN_FAILED:
            return loginFailed(state, action);

        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);
        default:
            return state;
    }
}

export default loginReducer;