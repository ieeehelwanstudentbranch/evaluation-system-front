import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const deleteComment = (id) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.delete(`/post/${id}/destroy-comment`)
            .then(response=>{
                console.log(response)
            }).catch(error=>{
                console.log(error);
            })
        ;
    }
}