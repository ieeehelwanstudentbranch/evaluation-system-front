import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';
const initialState = {};

const resetPasswordReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.RESET_PASSWORD_START:
            return reducers.loadingHandler(state, action);
            
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return reducers.SuccessHandler(state, action);

        case actionTypes.RESET_PASSWORD_FAILED:
            return reducers.FailerHandler(state, action);

        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);
        default:
            return state;
    }
}

export default resetPasswordReducer;