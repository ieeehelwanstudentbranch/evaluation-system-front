import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const login = (email, password, remember_me) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
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
                dispatch(actions.serverErrorHandler(error));
            })
        ;
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

export const checkLoginTime = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(destroyToken());
        }, expirationTime);
    }
}

export const destroyToken = () => {
    return {
        type: actionTypes.DESTROY_TOKEN
    }
}

export const logout = (token) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let data = {
            token: token
        }
        axios.post('/logout', data)
            .then(response=>{
                dispatch(logoutSuccess(response));
            })
            .catch(error => {
                dispatch(actions.serverErrorHandler(error));
            })
        ;
    }
}

export const logoutSuccess = (response) => {
    console.log(response.data);
    if (response.data.success){
        return {
            type: actionTypes.LOGOUT_SUCCESS,
            token: null,
            response: response.data.response,
            message: response.data.message
        }
    } else {
        return {
            message: response.data.message
        }
    }
    
}