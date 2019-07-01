import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';


export const handleTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_TASK_DETAILS,
        data: data
    }
}


export const fetchCrewVolunteers = () => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/create-task/')
            .then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
}