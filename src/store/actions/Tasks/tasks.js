import * as actionTypes from '../actionTypes';
import axios from '../../../axios';
import * as actions from '../repeatedActions';

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

export const handleDeliveringTaskDetails = (data) => {
    return {
        type: actionTypes.HANDLE_DELIVERING_TASK_DETAILS,
        data: data
    }
}

export const sendTask = (title, deadline, details, files, receptors) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.ADD_TASK_START));
        let formData = new FormData();
        formData.append('title', title);
        formData.append('deadline', deadline);
        formData.append('body', details);
        for (let i = 0; i < receptors.length; i++) {
            let receptor = receptors[i];
            formData.append('to[' + i + ']', receptor);
        }

        if (files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append('files[' + i + ']', file);
            }
        }
        axios.post('/create-task/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            dispatch(sendTaskSuccess(response.data.success));
        }).catch(error => {
            console.log(error.response)
            let convertedErrors = Object.keys(error.response.data.errors).map((key) => {
                return [error.response.data.errors[key]];
            });
            let errorsArray = [];
            // eslint-disable-next-line
            convertedErrors.map((error, index) => {
                if (typeof error === 'object') {
                    // eslint-disable-next-line
                    error.map((err, index) => {
                        if (typeof err === 'object') {
                            err.map((err, index) => (
                                errorsArray.push(err)
                            ))
                        } else {
                            errorsArray.push(err)
                        }
                    })
                } else {
                    errorsArray.push(error)
                }
            })
            dispatch(sendTaskFailed(errorsArray));
        });
    }
}

export const sendTaskSuccess = (response) => {
    return {
        type: actionTypes.ADDING_TASK_SUCCESS,
        message: response
    }
}

export const sendTaskFailed = (error) => {
    return {
        type: actionTypes.ADDING_TASK_FAILED,
        error: error
    }
}

export const deliverTask = (taskId, details, files) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.DELIVER_TASK_START));
        let formData = new FormData();
        formData.append('body', details);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append('files[' + i + ']', file);
            }
        }
        axios.post(`/deliver-task/${taskId}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response)
                dispatch(deliverTaskSuccess(response.data.message));
            }
        }).catch(error => {
            console.log(error.response)
            dispatch(actions.FailerHandler(actionTypes.DELIVER_TASK_FAILED, error.response.data.message))
        });
    }
}

export const deliverTaskSuccess = (response) => {
    return {
        type: actionTypes.DELIVER_TASK_SUCCESS,
        message: response
    }
}

export const fetchTasks = (type) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.FETCH_TASKS_START));
        if (type === 'pending') {
            axios.get('/pending-tasks/')
                .then(response => {
                    dispatch(fetchPendingTasksSuccess(response.data.data));
                }).catch(error => {
                    console.log(error.response)
                });
        }
        if (type === 'completed') {
            axios.get('/complete-tasks/')
                .then(response => {
                    dispatch(fetchCompletedTasksSuccess(response.data.data));
                }).catch(error => {
                    console.log(error.response)
                });
        }
    }
}

export const fetchPendingTasksSuccess = (tasks) => {
    let coordinating_tasks_array = [];
    if (tasks.coordinating_tasks && tasks.coordinating_tasks.length > 0) {
        // eslint-disable-next-line
        tasks.coordinating_tasks.map(array => {
            if (typeof array === 'object') {
                // eslint-disable-next-line
                array.map(item => {
                    coordinating_tasks_array.push(item)
                })
            } else {
                coordinating_tasks_array.push(array)
            }
        })
    }
    return {
        type: actionTypes.FETCH_PENDING_TASKS_SUCCESS,
        pendingMentoringTasks: tasks.mentoring_tasks ? tasks.mentoring_tasks[0] : null,
        pendingSentTasks: tasks.sent_tasks ? tasks.sent_tasks : null,
        pendingPersonalTasks: tasks.personal_tasks ? tasks.personal_tasks : null,
        pendingCoordinatingTasks: tasks.coordinating_tasks ? coordinating_tasks_array : null
    }
}

export const fetchCompletedTasksSuccess = (tasks) => {
    let coordinating_tasks_array = [];
    if (tasks.coordinating_tasks && tasks.coordinating_tasks.length > 0) {
        // eslint-disable-next-line
        tasks.coordinating_tasks.map(array => {
            if (typeof array === 'object') {
                // eslint-disable-next-line
                array.map(item => {
                    coordinating_tasks_array.push(item)
                })
            } else {
                coordinating_tasks_array.push(array)
            }
        })
    }
    return {
        type: actionTypes.FETCH_COMPLETED_TASKS_SUCCESS,
        completedMentoringTasks: tasks.mentoring_tasks ? tasks.mentoring_tasks[0] : null,
        completedSentTasks: tasks.sent_tasks ? tasks.sent_tasks : null,
        completedPersonalTasks: tasks.personal_tasks ? tasks.personal_tasks : null,
        completedCoordinatingTasks: tasks.coordinating_tasks ? coordinating_tasks_array : null
    }
}

export const refuseTask = (id) => {
    return dispatch => {
        dispatch(actions.loadingHandler(actionTypes.REFUSE_TASK_START));
        axios.post(`/refuse-task/${id}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    dispatch(refuseTaskSuccess(response.data.message))
                }

            }).catch(error => {
                console.log(error.response)
            });
    }
}

export const refuseTaskSuccess = (response) => {
    return {
        type: actionTypes.REFUSE_TASK_SUCCESS,
        message: response
    }
}

export const refuseTaskFailed = (response) => {
    return {
        type: actionTypes.REFUSE_TASK_FAILED,
        error: response
    }
}