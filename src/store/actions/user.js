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
            let form_data = new FormData();
            form_data.append('profile_image', newImage)
            axios.post('/update-profile-image/'+profileID, form_data, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            }).then(response=>{
                window.location.reload()
            }).catch(error=>{
                dispatch(actions.serverErrorHandler('Something Went wrong, please try again later'))
            });
        }
        
    }
}

export const editProfileData = () => {
    return{
        type: actionTypes.EDIT_PROFILE_DATA
    }
}

export const submitProfileData = (id, firstName, lastName, email, DOB, level, faculty, university, phone, address) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const updatedData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            DOB: DOB,
            level: level,
            faculty: faculty,
            university: university,
            phone: phone,
            address: address
        }
        axios.put(`/update-profile/${id}`, updatedData)
            .then(response=>{
                window.location.reload()
            })
            .catch(error => {
                dispatch(actions.serverErrorHandler(error.response.data));
            })
    }
}

export const cancelEditing = () => {
    return{
        type: actionTypes.CANCEL_EDITING
    }
}