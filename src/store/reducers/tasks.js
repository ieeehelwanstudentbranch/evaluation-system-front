import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState ={
    data: null,
    files: null,
    error: null,
    message: null,
}

const handleTaskFiles = (state, action) => {
    return {
        ...state,
        files: action.files
    };
}

const fetchPendingTasksSuccess = (state, action) => {
    return {
        ...state,
        pendingMentoringTasks: action.pendingMentoringTasks,
        pendingSentTasks: action.pendingSentTasks,
        pendingPersonalTasks: action.pendingPersonalTasks,
        pendingCoordinatingTasks: action.pendingCoordinatingTasks
    };
}

const fetchCompletedTasksSuccess = (state, action) => {
    return {
        ...state,
        completedMentoringTasks: action.completedMentoringTasks,
        completedSentTasks: action.completedSentTasks,
        completedPersonalTasks: action.completedPersonalTasks,
        completedCoordinatingTasks: action.completedCoordinatingTasks
    };
}

const tasksReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handle loading handler
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        // handling rich editor changes
        case actionTypes.HANDLE_TASK_DETAILS:
            return reducers.handleData(state, action);
        // handling rich editor changes
        case actionTypes.HANDLE_DELIVERING_TASK_DETAILS:
                return reducers.handleData(state, action);
        // handle Task Files
        case actionTypes.HANDLE_TASK_FILES:
            return handleTaskFiles(state, action);
        // fetching pending tasks
        case actionTypes.FETCH_PENDING_TASKS_SUCCESS:
            return fetchPendingTasksSuccess(state, action);
        // fetching pending tasks
        case actionTypes.FETCH_COMPLETED_TASKS_SUCCESS:
            return fetchCompletedTasksSuccess(state, action);
        default:
            return state
    }
}

export default tasksReducer