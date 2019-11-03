import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import axios from './axios';

import committeesReducer from './store/reducers/committees';
import postsReducer from './store/reducers/posts';
import userReducer from './store/reducers/user';
import tasksReducer from './store/reducers/Tasks/tasks';
import evaluateTaskReducer from './store/reducers/evaluateTask';

// auth reducers
import loginReducer from './store/reducers/Authentication/login';
import registerReducer from './store/reducers/Authentication/register';
import logoutReducer from './store/reducers/Authentication/logout';
import forgetPassword from './store/reducers/Authentication/forgetPassword';

import './index.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    
    committees: committeesReducer,
    posts: postsReducer,
    user: userReducer,
    tasks: tasksReducer,
    evaluateTask: evaluateTaskReducer,
    // auth reducer
    login: loginReducer,
    register: registerReducer,
    logout: logoutReducer,
    forgetPassword: forgetPassword
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// interceptors for Application
// interceptors for request
axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    // request.headers.Authorization =  token;
    config.headers.Authorization = `bearer ${token}`;
    return config;
}, error=>{
    console.log(error);
    return Promise.reject(error)
});

// interceptors for response
axios.interceptors.response.use(response=>{
    return response;
}, error=>{
    return Promise.reject(error)
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
