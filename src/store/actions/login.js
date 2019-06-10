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
                    dispatch(checkLoginTime(expirationDate));
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

export const checkLoginTime = (expirationDate) => {
    let currentDate = new Date();
    setInterval(()=>{
        if (expirationDate == currentDate){
            return dispatch => {
                dispatch(destroyToken());
            }
        }
    }, 1000)
}

export const destroyToken = () => {
    localStorage.clear()
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