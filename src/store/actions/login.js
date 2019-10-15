import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';
import * as profileActions from './user';
import * as LogoutFunctions from './logout'

export const login = (email, password) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.LOGIN_START));
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
                dispatch(actions.FailerHandler(actionTypes.SERVER_ERROR_HANDLER, "Network Error!"));
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
                dispatch(LogoutFunctions.logout(token));
            }else{
                currentDate = new Date();
            }
        }, 1000)
    }
}


export const checkAutherization = (id, token) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.LOGIN_START));
        let userID = parseInt(id);
        console.log(userID)
        axios.get(`/check-token/${userID}/${token}`)
            .then(response=>{
                // eslint-disable-next-line
                if(response.data.response == 'Success'){
                    return false
                } else{
                    dispatch(LogoutFunctions.logoutSuccess('Your token is not valid please login'))
                }
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
}

export const loginCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');
        if (!token){
            dispatch(LogoutFunctions.logoutSuccess(null));
        } else {
            const expirationDate = new Date (localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(LogoutFunctions.logoutSuccess('Your token is not valid please login'))
            }else {
                if(dispatch(checkAutherization(userID, token))){
                    dispatch(LogoutFunctions.logoutSuccess('Your token is not valid please login'))
                }else {
                    dispatch(loginSuccess(token, 'Your token is still valid, you had logged in automatically', userID));
                    dispatch(checkLoginTime(expirationDate, token));
                    dispatch(profileActions.fetchUserData(userID, userID));
                }
            }
        }
    }
}