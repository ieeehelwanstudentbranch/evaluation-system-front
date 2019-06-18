import * as actionTypes from './actionTypes';
// import axios from '../../axios';
// import * as actions from './repeatedActions';

export const handleData = (data) => {
    return {
        type: actionTypes.HANDLE_DATA,
        data: data
    }
}