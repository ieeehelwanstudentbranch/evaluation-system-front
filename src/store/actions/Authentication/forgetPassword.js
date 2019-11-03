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
                dispatch(actions.SuccessHandler(actionTypes.FORGET_PASSWORD_SUCCESS, response.data.data.message))
            })
            .catch(error => {
                dispatch(actions.FailerHandler(actionTypes.FORGET_PASSWORD_FAILED, error.response.data.error.email))
            })
        ;
    }
}