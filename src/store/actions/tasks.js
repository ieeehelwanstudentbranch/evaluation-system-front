import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const handleTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_TASK_DETAILS,
        data: data
    }
}

export const sendTask = (title, deadline, details, files, receptors) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let data = {
            title: title,
            deadline: deadline,
            body: details,
            files: files,
            to: receptors
        }
        // let formData = new FormData();
        // formData.append('title', title);
        // formData.append('deadline', deadline);
        // formData.append('body', details);
        // formData.append('files', file);
        // formData.append('to', receptors);
        axios.post('/create-task/', data)
            .then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}