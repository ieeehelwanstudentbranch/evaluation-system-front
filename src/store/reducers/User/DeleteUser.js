import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';

const initialState = {}

const deleteUserSuccess = (state, action) => {
    return {
        ...state,
        message: action.message,
        loading: false,
    };
}

const deleteUserFailed = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
}


const deleteUser = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.DELETE_USER_START:
            return reducers.loadingHandler(state, action);

        case actionTypes.DELETE_USER_SUCCESS:
            return deleteUserSuccess(state, action);

        case actionTypes.DELETE_USER_FAILED:
            return deleteUserFailed(state, action);
            
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);

        default:
            return state;
    }

}

export default deleteUser;