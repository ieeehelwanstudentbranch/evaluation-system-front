import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    data: null,
    posts: null,
    loading: false,
    error: null,
    editing: false,
    editingComment: false,
    comment: null
};

const fetchPostsSucceess = (state, action) => {
    return {
        ...state,
        posts: action.posts,
        loading: false,
        error: null,
        data: null
    };
}

const addPostFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}

const deletePostSuccess = (state, action) => {
    return{
        ...state,
        posts: state.posts.filter(post=>{
            return post.id !== action.id
        })
    }
}

const editPost = (state, action) => {
    return{
        ...state,
        data: action.data,
        posts: state.posts.filter(post=>{
            return post.id !== action.id
        }),
        editing: true,
        postID: action.id
    }
}

const editComment = (state, action) => {
    return{
        ...state,
        comment: action.comment,
        editingComment: true,
        commentID: action.id
    }
}

const editPostSuccess = (state, action) => {
    return{
        ...state,
        data: null,
        editing: false,
        postID: null
    }
}

const postsReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handling rich editor changes
        case actionTypes.HANDLE_POST_DETAILS:
            return reducers.handleData(state, action);
        // handling loader
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        // handling if fetching posts is success
        case actionTypes.FETCH_POSTS_SUCEESS:
            return fetchPostsSucceess(state, action);
        // handling adding post is failed
        case actionTypes.ADD_POST_FAILED:
            return addPostFailed(state, action);
        // handle deleting posts is success
        case actionTypes.DELETE_POST:
            return deletePostSuccess(state, action);
        // handle editing post
        case actionTypes.EDIT_POST:
            return editPost(state, action);
        // handle editing post
        case actionTypes.EDIT_POST_SUCCESS:
            return editPostSuccess(state, action);
        // handle editing post
        case actionTypes.EDIT_COMMENT:
            return editComment(state, action);
        // handling if server retairned any error
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.serverErrorHandler(state, action);
        // default state
        default:
            return state;
    }
}

export default postsReducer;