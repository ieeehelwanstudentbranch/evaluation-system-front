import * as actionTypes from '../actions/actionTypes';
import * as reducers from './repeatedReducers';

const initialState = {
    userData: null,
    profile: null,
    editing: false,
    editableContent: null,
    newImage: null
}
const fetchUserSucceess = (state, action) => {
    return {
        ...state,
        loading: false,
        userData: action.data,
        profile: action.data
    };
}

const fetchProfileSucceess = (state, action) => {
    return {
        ...state,
        loading: false,
        profile: action.data,
    };
}

const editProfileImage = (state, action) => {
    return {
        ...state,
        editing: true,
        editableContent: 'profileImage'
    };
}

const changeImage = (state, action) => {
    return {
        ...state,
        newImage: action.image
    };
}

const editProfileData = (state, action) => {
    return {
        ...state,
        editing: true,
        editableContent: 'profileData'
    };
}

const cancelEditing = (state, action) => {
    return {
        ...state,
        editing: false,
        editableContent: null,
    };
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_USER_START:
            return reducers.loadingHandler(state, action);

        case actionTypes.FETCH_USER_SUCCESS:
            return fetchUserSucceess(state, action);

        case actionTypes.FETCH_PROFILE_SUCCESS:
            return fetchProfileSucceess(state, action);

        case actionTypes.EDIT_PROFILE_IMAGE:
            return editProfileImage(state, action);

        case actionTypes.EDIT_PROFILE_DATA:
            return editProfileData(state, action);

        case actionTypes.CHANGE_IMAGE:
            return changeImage(state, action);

        case actionTypes.CANCEL_EDITING:
            return cancelEditing(state, action);

        case actionTypes.SERVER_ERROR_HANDLER:
            return reducers.FailerHandler(state, action);
        default:
            return state;
    }

}

export default userReducer;