import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers  } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import loginReducer from './store/reducers/login';

import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    login: loginReducer 
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

// interceptors for Application
// interceptors for request
axios.interceptors.request.use(request=>{
    console.log(request);
    return request;
}, error=>{
    console.log(error);
    return Promise.reject(error)
});
// interceptors for response
axios.interceptors.response.use(response=>{
    console.log(response);
    return response;
}, error=>{
    console.log(error);
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
