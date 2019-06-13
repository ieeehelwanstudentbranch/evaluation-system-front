import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';

export const register = (firstName, lastName, email, password, password_confirmation, DOB, faculty, university, position, ex_options, committee) => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const registerData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            DOB: DOB,
            faculty: faculty,
            university: university,
            position: position,
            ex_options: ex_options,
            committee: committee
        }
        axios.post('/register', registerData)
            .then(response=>{
                console.log(response)

            })
            .catch(error => {
                console.log(error.response)
                let Convertederror = JSON.stringify(error);
                console.log(Convertederror)
                
                // dispatch(actions.serverErrorHandler(error));
            })
    }
}

export const registerSuccess = (registerData) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        registerData: registerData
    }
}