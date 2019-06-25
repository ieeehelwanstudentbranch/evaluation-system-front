import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const fetchUserData = (profileID, userID=null) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/user/'+profileID)
            .then(response=>{
                console.log(response);
                if (profileID == userID){
                    dispatch(fetchUserDataSuccess(response.data.data))
                } else {
                    dispatch(fetchProfileDataSuccess(response.data.data))
                }
                
            }).catch(error=>{
                console.log(error);
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