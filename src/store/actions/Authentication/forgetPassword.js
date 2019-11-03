import * as actionTypes from '../actionTypes';
import axios from '../../../axios';
import * as actions from '../repeatedActions';

export const forgetPassword = (email) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.FORGET_PASSWORD_START));
        const formData = {
            email: email
        }
        axios.post('/password/reset', formData)
            .then(response=>{
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                // dispatch(actions.FailerHandler(actionTypes.SERVER_ERROR_HANDLER, "Network Error!"));
            })
        ;
    }
}

export const forgetPasswordSuccess = (message) => {
    return {
        type: actionTypes.FORGET_PASSWORD_SUCCESS,
        message: message
    }
}

export const forgetPasswordFailed = (message) => {
    return {
        type: actionTypes.FORGET_PASSWORD_FAILED,
        message: message
    }
}