import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';
const initialState = {};

const forgetPasswordSuccess = (state, action) => {
    return {
        ...state,
        message: action.message,
        error: null,
        loading: false
    };
}
const forgetPasswordFailed = (state, action) => {
    return {
        ...state,
        message: action.message,
        error: null,
        loading: false
    };
}

const forgetPasswordReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.FORGET_PASSWORD_START:
            return reducers.loadingHandler(state, action);
            
        case actionTypes.FORGET_PASSWORD_SUCCESS:
            return forgetPasswordSuccess(state, action);

        case actionTypes.FORGET_PASSWORD_FAILED:
            return forgetPasswordFailed(state, action);

        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);
        default:
            return state;
    }
}

export default forgetPasswordReducer;