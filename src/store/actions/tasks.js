import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const handleTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_TASK_DETAILS,
        data: data
    }
}

export const handleDeliveringTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_DELIVERING_TASK_DETAILS,
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

export const deliverTask = (taskId, details, files) => {
    return dispatch => {
        console.log(taskId, details, files)
        dispatch(actions.loadingHandler());

        let formData = new FormData();
        formData.append('body', details);
        
        if (files){
            for( let i = 0; i < files.length; i++ ){
                let file = files[i];
                formData.append('files[' + i + ']', file);
            }
        }
        axios.post(`/deliver-task/${taskId}`, formData, {
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

export const fetchPendingTasks = () => {
    return dispatch =>{
        dispatch(actions.loadingHandler());
        axios.get('/pending-tasks/')
            .then(response=>{
                console.log(response.data.data)
                dispatch(fetchPendingTasksSuccess(response.data.data));
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
}

export const fetchTasks = (type) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        if (type === 'pending'){
            axios.get('/pending-tasks/')
            .then(response=>{
                dispatch(fetchPendingTasksSuccess(response.data.data));
            }).catch(error=>{
                console.log(error.response)
            });
        }
        if (type === 'completed'){
            axios.get('/complete-tasks/')
            .then(response=>{
                dispatch(fetchCompletedTasksSuccess(response.data.data));
            }).catch(error=>{
                console.log(error.response)
            });
        }
    }
}

export const fetchPendingTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_PENDING_TASKS_SUCCESS,
        pendingMentoringTasks: tasks.mentoring_tasks?tasks.mentoring_tasks[0]:null,
        pendingSentTasks: tasks.sent_tasks?tasks.sent_tasks :null,
        pendingPersonalTasks: tasks.personal_tasks? tasks.personal_tasks:null,
        pendingCoordinatingTasks: tasks.coordinating_tasks?tasks.coordinating_tasks:null
    }
}

export const fetchCompletedTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_COMPLETED_TASKS_SUCCESS,
        completedMentoringTasks: tasks.mentoring_tasks?tasks.mentoring_tasks[0]:null,
        completedSentTasks: tasks.sent_tasks?tasks.sent_tasks :null,
        completedPersonalTasks: tasks.personal_tasks? tasks.personal_tasks:null,
        completedCoordinatingTasks: tasks.coordinating_tasks?tasks.coordinating_tasks:null
    }
}