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
        post_id: null,
        post_body: null,
        dateTime: null,
        post_owner: null,
        comments: null,
        error: null
    }

    componentDidMount(){
        axios.get(`${this.props.location.pathname}`)
            .then(response=>{
                console.log(response);
                this.setState({
                    post_id: response.data.data.id,
                    post_body: response.data.data.body,
                    dateTime: response.data.data.created_at,
                    post_owner: response.data.data.post_owner,
                })
            }).catch(error=>{
                this.setState({
                    error: 'Something went error, Please Try again later.'
                })
            })
        ;

        axios.get(`${this.props.location.pathname}/comments`)
            .then(response=>{
                this.setState({
                    comments: response.data.data
                })
            }).catch(error=>{
                this.setState({
                    error: 'Something went error, Please Try again later.'
                })
            })
        ;
    }

    editComment = (commentID) => {
        this.setState(prevState=>{
            return{
                ...prevState,
                comments: prevState.comments.filter(comment=>{
                    return comment.id !== commentID
                }),
            }
        })
    }

    deleteComment = (comment_id) => {
        axios.delete(`/destroy-comment/${comment_id}`)
            .then(response=>{
                this.setState(prevState=>{
                    return{
                        ...prevState,
                        comments: prevState.comments.filter(comment=>{
                            return comment.id !== comment_id
                        })
                    }
                })
            }).catch(error=>{
                console.log(error)
                this.setState({error: 'Deleting comment had failed'});
            })
        ;
    }

    render(){
        let post= <> </>;
        if (this.state.post_body){
            post = <div className={classes.SinglePost}>
                {
                    this.state.post_owner ?
                        <InformationHeader {...this.state.post_owner} created_at={this.state.dateTime}/>
                    :<></>
                }
                <article dangerouslySetInnerHTML={{__html: this.state.post_body}} className={classes.Content}></article>
                {
                    this.state.comments?
                        this.state.comments.map(comment=>(
                            <Comment key={comment.id} {...comment} editComment={()=>this.editComment(comment.id)} deleteComment={()=>this.deleteComment(comment.id)}/>
                        ))
                    :null
                }
                <CommentForm id={this.state.post_id}/>
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