import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';


export const addPost = (data) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const post = {
            body: data
        }
        axios.post('/create-post', post)
            .then(response=>{
                dispatch(fetchPosts());
            }).catch(error=>{
                console.log(error.response.data);
                dispatch(addPostFailed('Something went wrong, Please try again later'));
            })
        ;
    }
}

export const addPostFailed = (error) => {
    return {
        type: actionTypes.ADD_POST_FAILED,
        error: error
    }
}

export const fetchPosts = () => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/posts')
            .then(response=>{
                dispatch(fetchPostsSucceess(response.data.data))
            }).catch(error=>{
                dispatch(actions.serverErrorHandler('Something went Wrong, Please Try Again Later'))
            })
        ;
    }
}

export const fetchPostsSucceess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCEESS,
        posts: posts
    }
}

// export const deletePost = (id) => {
//     return dispatch => {
//         dispatch(actions.loadingHandler());
//         const data = {
//             id: id
//         }
//         axios.post('/create-post', data)
//             .then(response=>{
//                 dispatch(fetchPosts());
//             }).catch(error=>{
//                 console.log(error.response.data);
//                 dispatch(addPostFailed('Something went wrong, Please try again later'));
//             })
//         ;
//     }
// }