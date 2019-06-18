import * as actionTypes from './actionTypes';
import axios from '../../axios';
import * as actions from './repeatedActions';


export const addPost = data => {
    return dispatch => {
        dispatch(actions.loadingHandler());
        const post = {
            title: 'post title',
            body: data
        }
        axios.post('/create-post', post)
            .then(response=>{
                console.log(response)
            }).catch(error=>{
                console.log(error.response)
            })
        ;
    }
}
