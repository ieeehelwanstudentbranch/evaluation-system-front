import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    data: null,
    posts: null,
    loading: false,
    error: null,
    postOwner: null
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

const fetchProfileSucceess = (state, action) => {
    return {
        ...state,
        loading: false,
        postOwner: action.data,
    };
}

const postsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.HANDLE_DATA:
            return reducers.handleData(state, action);
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        case actionTypes.FETCH_POSTS_SUCEESS:
            return fetchPostsSucceess(state, action);
        case actionTypes.ADD_POST_FAILED:
            return addPostFailed(state, action);
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSucceess(state, action);
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.serverErrorHandler(state, action);
        default:
            return state;
    }
}

export default postsReducer;