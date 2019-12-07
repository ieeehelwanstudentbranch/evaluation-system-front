import * as actionTypes from '../actionTypes';
import axios from '../../../axios';
import * as actions from '../repeatedActions';

export const deleteUser = (id) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.DELETE_USER_START));
        console.log(id);
        axios.delete(`/delete-user/${id}`)
            .then(response => {
                console.log(response)
                dispatch(actions.SuccessHandler(actionTypes.DELETE_USER_SUCCESS,response.data.message))
            }).catch(error => {
                console.log(error.response)
                dispatch(actions.SuccessHandler(actionTypes.DELETE_USER_FAILED,error.response.data.error))
            });
    }
}

