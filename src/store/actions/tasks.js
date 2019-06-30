import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const fetchCrewVolunteers = () => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        axios.get('/create-task/')
            .then(response=>{
                console.log(response);
            }).catch(error=>{
                console.log(error)
            })
        ;
    }
}