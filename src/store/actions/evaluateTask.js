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
        dispatch(actions.loadingHandler());
        let evaluation ={
            rate: mark,
            evaluation: details
        }
        axios.post(`/accept-task/${id}`, evaluation)
            .then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}
