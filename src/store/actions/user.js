import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const fetchUserData = (profileID, userID=null) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/user/'+profileID)
            .then(response=>{
                if (profileID == userID){
                    dispatch(fetchUserDataSuccess(response.data.data))
                } else {
                    dispatch(fetchProfileDataSuccess(response.data.data))
                }
                
            }).catch(error=>{
                dispatch(actions.serverErrorHandler('Network Error, Please Try Again ater'))
            })
        ;
    }
}

export const fetchUserDataSuccess = (response) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        data: response
    }
}

export const fetchProfileDataSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        data: response
    }
}

export const editProfileImage = () => {
    return{
        type: actionTypes.EDIT_PROFILE_IMAGE
    }
}

export const changeImage = (newImage) => {
    return{
        type: actionTypes.CHANGE_IMAGE,
        image: newImage
    }
}

export const uploadImage = (profileID, newImage) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        if (newImage !== null){
            let data= {
                profile_image: newImage
            }
            axios.put('/update-profile-image/'+profileID, data,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error.response)
                // dispatch(actions.serverErrorHandler('Network Error, Please Try Again ater'))
            });
        }
        
    }
}

export const cancelEditing = () => {
    return{
        type: actionTypes.CANCEL_EDITING
    }
}