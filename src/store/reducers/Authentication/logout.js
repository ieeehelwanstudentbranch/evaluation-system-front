import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';

const initialState = {};

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

const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGOUT_START:
            return reducers.loadingHandler(state, action);

        case actionTypes.LOGOUT_SUCCESS:
            return logoutSuccess(state, action);

        case actionTypes.LOGOUT_FAILED:
            return logoutFailed(state, action);

        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);

        default:
            return state;
    }
}

export default logoutReducer;