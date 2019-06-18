import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    data: null,
    posts: null,
    loading: false,
    error: null
};

const richEditorReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.HANDLE_DATA:
            return reducers.handleData(state, action);
        default:
            return state;
    }
}

export default richEditorReducer;