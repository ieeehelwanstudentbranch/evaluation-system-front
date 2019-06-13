// Repeated actions types
/// loading handler: fired when starting any action 
export const LOADING_HANDLER = "LOADING_HANDLER";
/// server error: when there is error on the serve
export const SERVER_ERROR_HANDLER = "SERVER_ERROR_HANDLER";

// RGISTER
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

// LOGIN
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

// committees
export const ADD_COMMITTEE = "ADD_COMMITTEE";
export const EDIT_COMMITTEE = "EDIT_COMMITTEE";
export const REMOVE_COMMITTEE = "REMOVE_COMMITTEE";
export const RESET_COMMITTEE = "RESET_COMMITTEE";

// Tasks
export const ADD_TASK = "ADD_TASK";
export const DELIVER_TASK = "DELIVER_TASK";
export const RESET_TASK = "RESET_TASK";
export const EVALUATE_TASK = "EVALUATE_TASK";
export const FETCH_COMPLETED_TASKS_SUCCESS = "FETCH_COMPLETED_TASKS_SUCCESS";
export const FETCH_PENDING_TASKS_SUCCESS = "FETCH_PENDING_TASKS_SUCCESS";

// Posts
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";
export const EDIT_POSTS = "EDIT_POSTS";
export const FETCH_POSTS_SUCEESS = "FETCH_POSTS_SUCEESS";

// Profile
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const EDIT_PROFILE = "EDIT_PROFILE";