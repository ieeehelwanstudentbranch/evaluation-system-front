import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const loginSuccess = (token, response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        response: response
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
                dispatch(loginSuccess(response.data.result.token, response.data.response));
                console.log(response.data.result.token, response.data.response);
            })
            .catch(error => {
                console.log(error);
                dispatch(loginFailed(error));
            })
    }
}