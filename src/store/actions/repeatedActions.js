import * as actionTypes from './actionTypes';

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER
    }
}

export const serverErrorHandler = (error) => {
    return {
        type: actionTypes.SERVER_ERROR_HANDLER,
        error: error
    }
}

export const handleData = (data) => {
    return {
        type: actionTypes.HANDLE_DATA,
        data: data
    }
}