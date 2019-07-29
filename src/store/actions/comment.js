import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

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