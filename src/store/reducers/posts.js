import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    data: null,
    posts: null,
    loading: false,
    error: null,
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

const postsReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handling rich editor changes
        case actionTypes.HANDLE_DATA:
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
        // handling if server retairned any error
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.serverErrorHandler(state, action);
        // default state
        default:
            return state;
    }
}

export default postsReducer;