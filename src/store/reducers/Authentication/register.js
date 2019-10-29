import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';

const initialState = {
    message: null,
    error: null,
    loading: false
};

const registerSuccess = (state, action) => {
    return {
        ...state,
        message: action.message,
        error: null,
        loading: false
    };
}
const registerFailed = (state, action) => {
    return {
        ...state,
        message: action.message,
        error: action.error,
        loading: false
    };
}

const registerReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.REGISTRATION_START:
            return reducers.loadingHandler(state, action);
        case actionTypes.REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case actionTypes.REGISTER_FAILED:
            return registerFailed(state, action);
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);
        default:
            return state;
    }
}

export default registerReducer;