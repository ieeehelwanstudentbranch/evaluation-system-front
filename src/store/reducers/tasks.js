import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState ={
    data: null,
    error: null,
    message: null
}

const tasksReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handling rich editor changes
        case actionTypes.HANDLE_TASK_DETAILS:
            return reducers.handleData(state, action);
        default:
            return state
    }
}

export default tasksReducer