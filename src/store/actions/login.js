import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const loginSuccess = (loginData) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        loginData: loginData
    }
}

export const loginFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        error: error
    }
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(loginStart())
    }
}