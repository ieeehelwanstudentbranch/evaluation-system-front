import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const register = (firstName, lastName, email, password, password_confirmation, DOB, faculty, university, position, ex_options, committee) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const registerData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            DOB: DOB,
            faculty: faculty,
            university: university,
            position: position,
            ex_options: ex_options,
            committee: committee
        }
        axios.post('/register', registerData)
            .then(response=>{
                dispatch(registerSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(registerFailed(error.response.data));
            })
    }
}

export const registerSuccess = (message) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        message: message
    }
}

export const registerFailed = (error) => {
    return {
        type: actionTypes.REGISTER_FAILED,
        message: error.message,
        error: error.errors
    }
}