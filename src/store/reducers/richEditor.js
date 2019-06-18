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

const richEditorReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.HANDLE_DATA:
            return reducers.handleData(state, action);
        case actionTypes.FETCH_POSTS_SUCEESS:
            return fetchPostsSucceess(state, action);
        default:
            return state;
    }
}

export default richEditorReducer;