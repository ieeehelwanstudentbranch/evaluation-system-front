import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const initializeCommittees = () => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.FETCH_COMMITTEES_START));
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
        dispatch(actions.loadingHandler(actionTypes.ADD_COMMITTEE_START));
        let committeeData = {
            name: name,
            mentor: mentor,
            director: director,
            hr_od: hr_od
        }
        axios.post('/addcommittee', committeeData)
            .then(response=>{
                window.location.reload()
            })
            .catch(error=>{
                dispatch(actions.FailerHandler(error))
            })
    }
}

export const editCommittee = (id, name, mentor, director, hr_od) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.EDIT_COMMITTEE_START));
        let committeeData = {
            name: name,
            mentor: mentor?mentor.toString():null,
            director: director? director.toString():null,
            hr_coordinator: hr_od?hr_od.toString():null
        }
        console.log(committeeData)
        axios.put('/updatecommittee/'+id , committeeData)
            .then(response=>{
                window.location.reload()
            })
            .catch(error=>{
                dispatch(actions.FailerHandler(error))
            })
    }
}