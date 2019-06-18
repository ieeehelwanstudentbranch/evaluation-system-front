import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    data: null,
    posts: null,
    loading: false,
    error: null
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

const fetchPostsFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error,
    };
}

const richEditorReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        case actionTypes.HANDLE_DATA:
            return reducers.handleData(state, action);
        case actionTypes.FETCH_POSTS_SUCEESS:
            return fetchPostsSucceess(state, action);
        case actionTypes.FETCH_POSTS_FAILED:
            return fetchPostsFailed(state, action);
        default:
            return state;
    }
}

export default richEditorReducer;