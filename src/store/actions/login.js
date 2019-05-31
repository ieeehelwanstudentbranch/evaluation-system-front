import * as actionTypes from './actionTypes';
import axios from '../../axios';

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
        dispatch(loginStart());
        const loginData = {
            email: email,
            password: password
        }
        axios.post('/login', loginData)
            .then(response=>{
                response.json();
            })
            .catch(error => {
                error = JSON.parse(JSON.stringify(error));
                console.log(error)
            })
    }
}