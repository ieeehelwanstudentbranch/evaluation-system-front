// Repeated actions types
/// loading handler: fired when starting any action 
export const LOADING_HANDLER = "LOADING_HANDLER";
/// server error: when there is error on the serve
export const SERVER_ERROR_HANDLER = "SERVER_ERROR_HANDLER";

// RGISTER
export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

// LOGIN
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

// Logout 
export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

// committees
// fetch committees in committees page
export const FETCH_COMMITTEES_START = "FETCH_COMMITTEES_START";
export const FETCH_COMMITTEES_SUCCESS = "FETCH_COMMITTEES_SUCCESS";
export const FETCH_COMMITTEES_FAILED = "FETCH_COMMITTEES_FAILED";
// add committee
export const ADD_COMMITTEE_START = "ADD_COMMITTEE_START";
export const ADD_COMMITTEE_SUCCESS = "ADD_COMMITTEE_SUCCESS";
export const ADD_COMMITTEE_FAILED = "ADD_COMMITTEE_FAILED";
// edit committee
export const EDIT_COMMITTEE_START = "EDIT_COMMITTEE_START";
export const EDIT_COMMITTEE = "EDIT_COMMITTEE";

// Tasks
export const HANDLE_TASK_DETAILS = "HANDLE_TASK_DETAILS";
export const HANDLE_TASK_FILES = "HANDLE_TASK_FILES";

// Fetch Tasks start
export const FETCH_TASKS_START = "FETCH_TASKS_START";

// Fetch Pending Tasks 
export const FETCH_PENDING_TASKS_SUCCESS = "FETCH_PENDING_TASKS_SUCCESS";

// Fetch Completed Tasks
export const FETCH_COMPLETED_TASKS_SUCCESS = "FETCH_COMPLETED_TASKS_SUCCESS";

// add Task
export const ADD_TASK_START = "ADD_TASK_START";
export const ADD_TASK = "ADD_TASK";

// Deliver Task
export const DELIVER_TASK_START = "DELIVER_TASK_START";
export const DELIVER_TASK = "DELIVER_TASK";
export const HANDLE_DELIVERING_TASK_DETAILS = "HANDLE_DELIVERING_TASK_DETAILS";
export const RESET_TASK = "RESET_TASK";
export const EVALUATING_TASK_START = "EVALUATING_TASK_START";
export const EVALUATE_TASK = "EVALUATE_TASK";
export const HANDLE_EVALUATING_TASK_DETAILS = "HANDLE_EVALUATING_TASK_DETAILS";


// Posts
/// Rich Editor action to handle data in rich editor it used used in posts and tasks
export const HANDLE_POST_DETAILS = "HANDLE_POST_DETAILS";

export const ADD_POST_START = "ADD_POST_START";
export const ADD_POST_FAILED = "ADD_POST_FAILED";

export const EDIT_POST_START = "EDIT_POST_START";
export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";

export const DELETE_POST_START = "DELETE_POST_START";
export const DELETE_POST = "DELETE_POST";

// Fetch Posts
export const FETCH_POSTS_START = "FETCH_POSTS_START";
export const FETCH_POSTS_SUCEESS = "FETCH_POSTS_SUCEESS";
export const FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// Profile
export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const FETCH_PROFILE_START = "FETCH_PROFILE_START";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";

export const EDIT_PROFILE_IMAGE = "EDIT_PROFILE_IMAGE";
export const EDITING_PROFILE_DATA_START = "EDITING_PROFILE_DATA_START";
export const EDIT_PROFILE_DATA = "EDIT_PROFILE_DATA";
export const CHANGE_IMAGE = "CHANGE_IMAGE";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const CANCEL_EDITING = "CANCEL_EDITING";


