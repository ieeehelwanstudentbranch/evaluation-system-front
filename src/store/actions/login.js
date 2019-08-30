import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';
import * as profileActions from './user';

export const login = (email, password) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const loginData = {
            email: email,
            password: password,
        }
        axios.post('/login', loginData)
            .then(response=>{
                if (response.data.hasOwnProperty('token')){
                    // calculate expiration date
                    let expirationDate = new Date(new Date().getTime() + (response.data.expirationTime * 60) * 1000);
                    // set token and expiration date in local storage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userID', response.data.userId);
                    dispatch(loginSuccess(response.data.token, response.data.message, response.data.userId));
                    dispatch(checkLoginTime(expirationDate, response.data.token));
                    dispatch(profileActions.fetchUserData(response.data.userId,response.data.userId));
                    window.location.href = '/home'
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

export const loginSuccess = (token, message, userID) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: `bearer ${token}`,
        userID: userID,
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

export const logout = (token) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let data = {
            token: token
        }
        axios.post('/logout', data)
            .then(response=>{
                if (response.data.success){
                    dispatch(logoutSuccess(response.data.message));
                    window.location.href = '/'
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

export const logoutSuccess = (message) => {
    localStorage.clear()
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        token: null,
        userID: null,
        message: message
    }
}
export const logoutFailed = (message) => {
    return {
        type: actionTypes.LOGOUT_FAILED,
        message: message
    }
}

export const loginCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logoutSuccess(null));
        } else {
            const expirationDate = new Date (localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout(token))
            }else {
                const userID = localStorage.getItem('userID');
                dispatch(loginSuccess(token, 'Your token is still valid, you had loggedin automatically', userID));
                dispatch(checkLoginTime(expirationDate, token));
                dispatch(profileActions.fetchUserData(userID, userID));
            }
        }
    }
}