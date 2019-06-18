import * as actionTypes from '../actions/actionTypes';
// import * as reducers from './repeatedReducers';

const initialState = {
    data: null
};

const handleData = (state, action) => {
    return {
        ...state,
        data: action.data,
    };
}

/* const editData = (state, action) => {
    return {
        ...state,
        data: action.data,
        message: action.message,
        error: null,
        loading: false
    };
}

const deleteData = (state, action) => {
    return {
        ...state,
        data: action.data,
        message: action.message,
        error: null,
        loading: false
    };
}
*/

const richEditorReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.HANDLE_DATA:
            return handleData(state, action);
        default:
            return state;
    }
}

export default richEditorReducer;