import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const handleEvaluatingTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_EVALUATING_TASK_DETAILS,
        data: data
    }
}

export const evaluatingTask = (id, mark, details) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.EVALUATING_TASK_START));
        let evaluation ={
            rate: mark,
            evaluation: details
        }
        axios.post(`/accept-task/${id}`, evaluation)
            .then(response=>{
                window.location.replace('/')
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}
