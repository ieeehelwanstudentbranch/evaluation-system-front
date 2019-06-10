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
                if (response.data.hasOwnProperty('token')){
                    let token = `bearer ${response.data.token}`;
                    // calculate expiration date
                    let expirationDate = new Date(new Date().getTime() + response.data.expirationTime * 1000);
                    // set token and expiration date in local storage
                    localStorage.setItem('token', token);
                    localStorage.setItem('expirationDate', expirationDate);
                    dispatch(loginSuccess(token, response.data.message));
                    dispatch(checkLoginTime(expirationDate, response.data.token));
                }else{
                    dispatch(loginFailed(response.data.message));
                }
            })
            .catch(error => {
                dispatch(actions.serverErrorHandler(error));
            })
        ;
    }
}

export const loginSuccess = (token, message) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        message: message
    }
}

export const loginFailed = (message) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        message: message
    }
}

export const checkLoginTime = (expirationDate, token) => {
    return dispatch => {
        let currentDate = new Date();
        let interval = setInterval(()=>{
            if (currentDate >= expirationDate){
                clearInterval(interval);
                dispatch(logout(token));
            }else{
                currentDate = new Date();
            }
        }, 1000)
    }
}

export const logout = (token = null) => {
    return dispatch => {
        if (token !== null){
            dispatch(actions.loadingHandler());
            let data = {
                token: token
            }
            axios.post('/logout', data)
                .then(response=>{
                    if (response.data.success){
                        dispatch(logoutSuccess(response.data.message));
                    } else {
                        dispatch(logoutFailed(response.data.message));
                    }
                })
                .catch(error => {
                    dispatch(actions.serverErrorHandler(error));
                })
            ;
        }
    }
}

export const logoutSuccess = (message) => {
    localStorage.clear()
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        token: null,
        message: message
    }
}
export const logoutFailed = (message) => {
    return {
        type: actionTypes.LOGOUT_FAILED,
        message: message
    }
}