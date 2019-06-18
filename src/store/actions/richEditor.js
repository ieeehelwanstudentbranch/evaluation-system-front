import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';


export const addPost = data => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const post = {
            title: 'post title',
            body: data
        }
        axios.post('/create-post', post)
            .then(response=>{
                dispatch(fetchPosts());
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}

export const fetchPosts = () => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/posts')
            .then(response=>{
                dispatch(fetchPostsSucceess(response.data.data))
            }).catch(error=>{
                dispatch(fetchPostsFailed(error))
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

export const fetchPostsFailed = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAILED,
        error: 'Something went Wrong, Please Try Again Later'
    }
}
