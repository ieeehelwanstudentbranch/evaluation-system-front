import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    comments: null,
    data: null,
    editing: false,
    editingComment: false,
    comment: null
};

const postsReducer = (state = initialState, action)=>{
    switch (action.type) {
        // handling loader
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        // handling if server retairned any error
        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.serverErrorHandler(state, action);
        
        // default state
        default:
            return state;
    }
}

export default postsReducer;