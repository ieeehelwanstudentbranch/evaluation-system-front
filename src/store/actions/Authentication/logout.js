import * as actionTypes from '../actionTypes';
import axios from '../../../axios';
import * as actions from '../repeatedActions';

export const logout = (token) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.LOGOUT_START));
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
                dispatch(actions.FailerHandler(error));
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