import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const handleEvaluatingTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_EVALUATING_TASK_DETAILS,
        data: data
    }
}
