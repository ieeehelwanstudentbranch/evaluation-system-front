import React, { Component } from 'react';
import * as classes from './Post.module.scss';
import {NavLink} from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
class Post extends Component{
    render(){
        return (
            <article className={classes.Post}>
                <header>
                    <div className={classes.Info}>
                        <NavLink to={`/user/${this.props.postOwner.user_id}`}>
                            {
                                this.props.postOwner.image === "default.jpg" ?
                                    <img src={`http://localhost:8000/uploaded/profile_images/${this.props.postOwner.image}`} alt={`${this.props.name}`}/>
                                    :<img src={`http://localhost:8000/storage${this.props.postOwner.image}`} alt={`${this.props.name}`}/>
                            }    
                        </NavLink>
                        <div>
                            <NavLink to={`/user/${this.props.postOwner.user_id}`}>{`${this.props.postOwner.firstName} ${this.props.postOwner.lastName}`}</NavLink>
                            <span>{this.props.postOwner.position}</span>
                            <time dateTime={this.props.date_time}>{this.props.date_time}</time>
                        </div>
                    </div>
                    {   
                        // eslint-disable-next-line
                        this.props.userID == this.props.postOwner.user_id?
                        <div className={classes.Actions}>
                            {this.props.editing === false?
                                <>
                                    <MdModeEdit onClick={()=>this.props.onEdit(this.props.postID, this.props.body)}/>
                                    <MdDelete onClick={()=>this.props.onDelete(this.props.postID)}/>
                                </>
                                :
                                <></>
                            }
                            
                        </div>
                        : <></>
                    }
                </header>
                <div dangerouslySetInnerHTML={{__html: this.props.body.substring(0, 500)}} className={classes.Content}></div>
                <NavLink to={"/post/"+this.props.postID}>View Post</NavLink>
            </article>
        )
    }
}

const mapStateToProps = state => {
    return{
        userID: state.login.userID,
        editing: state.posts.editing
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onDelete: (id)=>dispatch(actions.deletePost(id)),
        onEdit: (id, post)=>dispatch(actions.editPost(id, post))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)