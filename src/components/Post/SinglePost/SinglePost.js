import React, { Component } from 'react';
import * as classes from './SinglePost.module.scss';
import axios from '../../../axios';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Comment from './Comment/Comment';
import CommentForm from './Comment/CommentForm/CommentForm';
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
                {this.state.postOwner ?
                    <header>
                        <div className={classes.Info}>
                            <NavLink to=""><img src={`http://localhost:8000/uploaded/profile_images/${this.state.postOwner.image}`} alt={`${this.state.postOwner.firstName} ${this.state.postOwner.lastName}`}/></NavLink>
                            <div>
                                <NavLink to="">{`${this.state.postOwner.firstName} ${this.state.postOwner.lastName}`}</NavLink>
                                <span>{this.state.postOwner.position}</span>
                                <time dateTime={this.state.dateTime}>{this.state.dateTime}</time>
                            </div>
                        </div>
                    </header>: <></>
                }
                <article dangerouslySetInnerHTML={{__html: this.state.post}} className={classes.Content}></article>
                {
                    this.state.comments?
                        this.state.comments.map(comment=>(
                            <Comment key={comment.comment_id} id={comment.comment_id} body={comment.comment_body} commentOwner={comment.comment_owner} date_time={comment.created_at}/>
                        ))
                    : <></>
                }
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