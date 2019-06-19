import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const fetchUserData = (id) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/user/'+id)
            .then(response=>{
                console.log(response);
                dispatch(fetchUserDataSuccess(response.data.data))
            }).catch(error=>{
                console.log(error);
            })
        ;
    }
}

export const fetchUserDataSuccess = (response) => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        data: response
    }
}