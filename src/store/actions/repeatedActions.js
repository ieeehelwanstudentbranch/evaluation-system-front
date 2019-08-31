import * as actionTypes from './actionTypes';

export const loadingHandler = (type = actionTypes.LOADING_HANDLER) => {
    return {
        type: type
    }
}

export const FailerHandler = (errorType = actionTypes.SERVER_ERROR_HANDLER, error) => {
    return {
        type: errorType,
        error: error
    }
}