import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    committees: null,
    error: false,
    loading: false
};

const fetchCommitteeSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading: false,
        committees: action.committees
    };
}
const fetchCommitteeFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
}

const committeesReducer = (state = initialState, action)=>{
    switch (action.type) {
        case actionTypes.LOADING_HANDLER:
            return reducers.loadingHandler(state, action);
        case actionTypes.FETCH_COMMITTEES_SUCCESS:
            return fetchCommitteeSuccess(state, action);
        case actionTypes.FETCH_COMMITTEES_FAILED:
            return fetchCommitteeFailed(state, action);
        default:
            return state;
    }
}

export default committeesReducer;