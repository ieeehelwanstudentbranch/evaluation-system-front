import React, { Component } from 'react';
import * as classes from './SinglePost.module.scss';
import axios from '../../../axios';
import {connect} from 'react-redux';
import Comment from './Comment/Comment.jsx';
import CommentForm from './Comment/CommentForm/CommentForm';
import InformationHeader from '../../UI/InformationHeader/InformationHeader.jsx';
import mappingFunction from '../../../utilize/mappingFunction';
class SinglePost extends Component{
    state={
        post: null,
        dateTime: null,
        postOwner: null,
        comments: null,
        id: null
    }
    componentDidMount(){
        axios.get(`${this.props.location.pathname}`)
            .then(response=>{
                this.setState({
                    post: response.data.data.body,
                    dateTime: response.data.data.created_at,
                    postOwner: response.data.data.post_owner,
                    comments: response.data.data.comments,
                    id: response.data.data.id
                })
            }).catch(error=>{
                console.log(error)
            })
    }
    render(){
        let post= <> </>;
        if (this.state.post){
            post = <div className={classes.SinglePost}>
                {
                    this.state.postOwner ?
                        <InformationHeader {...this.state.postOwner} created_at={this.state.dateTime}/>
                    :<></>
                }
                <article dangerouslySetInnerHTML={{__html: this.state.post}} className={classes.Content}></article>
                {mappingFunction(this.state.comments, Comment)}
                <CommentForm id={this.state.id}/>
            </div>
        }
        return (
            post
        )
    }
}

const mapStateToProps = state => {
    return{
        userID: state.login.userID
    }
}
export default connect(mapStateToProps, null)(SinglePost)