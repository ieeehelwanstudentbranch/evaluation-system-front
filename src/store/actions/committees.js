import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const initializeCommittees = () => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/committees')
            .then(response=>{
                let committees = response.data.data;
                dispatch(fetchCommitteeSuccess(committees));
            }).catch(error=>{
                dispatch(fetchCommitteeFailed(error));
            })
        ;
    }
}

export const fetchCommitteeSuccess = (committees) => {
    return{
        type: actionTypes.FETCH_COMMITTEES_SUCCESS,
        committees: committees,
        error: null
    }
}

export const fetchCommitteeFailed = (error) => {
    return{
        type: actionTypes.FETCH_COMMITTEES_FAILED,
        error: error
    }
}