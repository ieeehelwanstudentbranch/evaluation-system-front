import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const destroyToken = () => {
    return {
        type: actionTypes.DESTROY_TOKEN
    }
}

export const checkLoginTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(destroyToken());
        }, expirationTime);
    }
}

export const loginSuccess = (response) => {
    if (response.data.hasOwnProperty('token')){
        return {
            type: actionTypes.LOGIN_SUCCESS,
            token: response.data.token,
            response: response.data.response,
            message: response.data.message
        }
    } else {
        return {
            type: actionTypes.LOGIN_SUCCESS,
            response: response.data.response,
            message: response.data.message
        }
    }
}

export const loginFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        error: error
    }
}

export const login = (email, password, remember_me) => {
    return dispatch => {
        dispatch(loginStart());
        const loginData = {
            email: email,
            password: password,
            remember_me: remember_me
        }
        axios.post('/login', loginData)
            .then(response=>{
                dispatch(loginSuccess(response));
                dispatch(checkLoginTime(response.data.expirationTime));
            })
            .catch(error => {
                dispatch(loginFailed(error));
            })
        ;
    }
}