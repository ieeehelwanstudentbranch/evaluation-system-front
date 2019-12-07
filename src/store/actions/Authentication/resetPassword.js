import * as actionTypes from '../actionTypes';
import axios from '../../../axios';
import * as actions from '../repeatedActions';

export const resetPassword = (resetCode, newPassword) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.RESET_PASSWORD_START));
        const formData = {
            password: newPassword,
            password_confirmation: newPassword
        }
        axios.post(`/password/reset/${resetCode}`, formData)
            .then(response => {
                console.log(response)
                dispatch(actions.SuccessHandler(actionTypes.RESET_PASSWORD_SUCCESS, response.data.message))
            })
            .catch(error => {
                console.log(error.response)
                dispatch(actions.FailerHandler(actionTypes.RESET_PASSWORD_FAILED, error.response.data.error))
            });
    }
}