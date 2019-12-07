import * as actionTypes from './actionTypes';

export const loadingHandler = (type = actionTypes.LOADING_HANDLER) => {
    return {
        type: type
    }
}


export const SuccessHandler = (actionType, message, ...params) => {
    return {
        type: actionType,
        message: message,
        ...params
    }
}

export const FailerHandler = (actionType = actionTypes.SERVER_ERROR_HANDLER, error = "Something went error, Please try again later.") => {
    return {
        type: actionType,
        error: error
    }
}