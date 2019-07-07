import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const handleTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_TASK_DETAILS,
        data: data
    }
}

export const handleTaskFiles = (files) => {
    return {
        type: actionTypes.HANDLE_TASK_FILES,
        files: files
    }
}

export const sendTask = (title, deadline, details, files, receptors) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        let formData = new FormData();
        formData.append('title', title);
        formData.append('deadline', deadline);
        formData.append('body', details);
        for( let i = 0; i < receptors.length; i++ ){
            let receptor = receptors[i];
            formData.append('to[' + i + ']', receptor);
        }
        
        if (files){
            for( let i = 0; i < files.length; i++ ){
                let file = files[i];
                formData.append('files[' + i + ']', file);
            }
        }
        axios.post('/create-task/', formData, {
            headers: {
              'content-type': 'multipart/form-data'
            }
        }).then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}