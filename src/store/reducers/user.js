import * as actionTypes from '../actions/actionTypes';
// import * as reducers from './repeatedReducers';

const initialState ={
    userData: null,
    profile: null,
    loading: false,
    error: null,
    message: null
}
const fetchUserSucceess = (state, action) => {
    return {
        ...state,
        loading: false,
        userData: action.data,
        profile: action.data
    };
}

const fetchProfileSucceess = (state, action) => {
    return {
        ...state,
        loading: false,
        profile: action.data,
    };
}

const userReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.FETCH_USER_SUCCESS:
            return fetchUserSucceess(state, action);
        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSucceess(state, action);
        default:
            return state;
    }
        
}

export default userReducer;