import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const editComment = (id, data) => {
    return{
        type: actionTypes.EDIT_COMMENT,
        id: id,
        comment: data
    }
}

export const deleteComment = (id) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.delete(`/post/${id}/destroy-comment/`)
            .then(response=>{
                window.location.reload();
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}