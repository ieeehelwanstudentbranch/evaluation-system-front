import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

// fetch post comments
export const fetchComments = (postId) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get(`/post/${postId}/comments`)
            .then(response=>{
                // window.location.reload();
                console.log(response)
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
}

// add comment functionality
export const addComment = (postId, body) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let comment = {
            comment_body: body
        }
        axios.post(`/post/${postId}/add-comment`, comment)
            .then(response=>{
                // window.location.reload();
                console.log(response)
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
}

export const addCommentSuccess = () => {
    return {
        type: actionTypes.ADD_COMMENT_SUCCESS
    }
}

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