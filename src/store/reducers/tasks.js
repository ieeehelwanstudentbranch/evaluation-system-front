import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState ={
    data: null,
    files: null,
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

const addingTaskSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        message: action.message,
        data: null,
        files: null
    };
}

const tasksReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handle Fetching tasks
        case actionTypes.FETCH_TASKS_START:
            return reducers.loadingHandler(state, action);

        // handle adding tasks
        case actionTypes.ADD_TASK_START:
            return reducers.loadingHandler(state, action);

        // handle Success of sending tasks
        case actionTypes.ADDING_TASK_SUCCESS:
            return addingTaskSuccess(state, action);

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