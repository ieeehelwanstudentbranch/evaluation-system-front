import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState ={
    data: null,
    loading: false,
    error: null,
    message: null
}



const evaluateTaskReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handle loading handler
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);

        // handling rich editor changes
        case actionTypes.HANDLE_EVALUATING_TASK_DETAILS:
            return reducers.handleData(state, action);

        default:
            return state
    }
}

export default evaluateTaskReducer;