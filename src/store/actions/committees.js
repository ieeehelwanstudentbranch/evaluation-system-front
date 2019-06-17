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

export const addCommittee = (name, mentor, director, hr_od) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let committeeData = {
            name: name,
            mentor: mentor,
            director: director,
            hr_od: hr_od
        }
        axios.post('/addcommittee', committeeData)
            .then(response=>{
                dispatch(initializeCommittees());
            })
            .catch(error=>{
                dispatch(actions.serverErrorHandler(error))
            })
    }
}

export const editCommittee = (id, name, mentor, director, hr_od) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let committeeData = {
            name: name,
            mentor: mentor,
            director: director,
            hr_od: hr_od
        }
        axios.post('/updatecommittee/'+id , committeeData)
            .then(response=>{
                dispatch(initializeCommittees());
            })
            .catch(error=>{
                dispatch(actions.serverErrorHandler(error))
            })
    }
}