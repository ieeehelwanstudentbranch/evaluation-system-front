import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const registerStart = () => {
    return {
        type: actionTypes.LOADING_HANDLER
    }
}

export const registerSuccess = (registerData) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        registerData: registerData
    }
}

export const registerFailed = (error) => {
    return {
        type: actionTypes.SERVER_ERROR_HANDLER,
        error: error
    }
}

export const register = (firstName, lastName, email, password, password_confirmation, DOB, faculty, university, position, ex_options, committee) => {
    return dispatch => {
        dispatch(registerStart());
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
                dispatch(registerSuccess(response.data));
            })
            .catch(error => {
                dispatch(registerFailed(error));
            })
    }
}