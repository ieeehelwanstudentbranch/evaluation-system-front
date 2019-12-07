import * as actionTypes from '../../actions/actionTypes';
import * as reducers from '../repeatedReducers';

const initialState = {
    data: null,
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
        loading: false,
        pendingMentoringTasks: action.pendingMentoringTasks,
        pendingSentTasks: action.pendingSentTasks,
        pendingPersonalTasks: action.pendingPersonalTasks,
        pendingCoordinatingTasks: action.pendingCoordinatingTasks
    };
}

const fetchCompletedTasksSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
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

const addingTaskFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
}

const deliveringTasksSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        data: null,
        files: null,
        message: action.message
    }
}

const deliveringTasksFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
        files: null,
        message: null
    }
}

const refuseTasksSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        message: action.message
    }
}

const refuseTasksFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
        message: null
    }
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        // handle Fetching tasks
        case actionTypes.FETCH_TASKS_START:
            return reducers.loadingHandler(state, action);

            //// fetching pending tasks
        case actionTypes.FETCH_PENDING_TASKS_SUCCESS:
            return fetchPendingTasksSuccess(state, action);

            //// fetching pending tasks
        case actionTypes.FETCH_COMPLETED_TASKS_SUCCESS:
            return fetchCompletedTasksSuccess(state, action);

            //// handling rich editor changes
        case actionTypes.HANDLE_TASK_DETAILS:
            return reducers.handleData(state, action);

        // handle adding tasks
        case actionTypes.ADD_TASK_START:
            return reducers.loadingHandler(state, action);

            //// handle Success of sending tasks
        case actionTypes.ADDING_TASK_SUCCESS:
            return addingTaskSuccess(state, action);

            //// handle sending tasks failer
        case actionTypes.ADDING_TASK_FAILED:
            return addingTaskFailed(state, action);

            // handle delivering task
        case actionTypes.DELIVER_TASK_START:
            return reducers.loadingHandler(state, action);

            //// handling rich editor changes
        case actionTypes.HANDLE_DELIVERING_TASK_DETAILS:
            return reducers.handleData(state, action);

        // handle Task Files
        case actionTypes.HANDLE_TASK_FILES:
            return handleTaskFiles(state, action);

        case actionTypes.DELIVER_TASK_SUCCESS:
            return deliveringTasksSuccess(state, action);

        case actionTypes.DELIVER_TASK_FAILED:
            return deliveringTasksFailed(state, action);

        // Refuse Task
        case actionTypes.REFUSE_TASK_START:
            return reducers.loadingHandler(state, action);

            //// handle Success of Refuseing tasks
        case actionTypes.REFUSE_TASK_SUCCESS:
            return refuseTasksSuccess(state, action);

            //// handle refusing tasks failer
        case actionTypes.REFUSE_TASK_FAILED:
            return refuseTasksFailed(state, action);

        default:
            return state
    }
}

export default tasksReducer