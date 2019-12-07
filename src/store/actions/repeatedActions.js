import * as actionTypes from './actionTypes';

// Loading handler
export const loadingHandler = (type = actionTypes.LOADING_HANDLER) => {
    return {
        type: type
    }
}

// Request Success Handler
export const SuccessHandler = (actionType, message, ...params) => {
    return {
        type: actionType,
        message: message,
        ...params
    }
}

// Request Failed Handler
export const FailerHandler = (actionType = actionTypes.SERVER_ERROR_HANDLER, error = "Something went error, Please try again later.") => {
    return {
        type: actionType,
        error: error
    }
}