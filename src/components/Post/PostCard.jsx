import React, { Component } from 'react';
import * as classes from './PostCard.module.scss';
import {NavLink} from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import InformationHeader from '../UI/InformationHeader/InformationHeader.jsx'
class Post extends Component{
    render(){
        return (
            <article className={classes.Post}>
                <header>
                    <InformationHeader {...this.props.post_owner} created_at={this.props.created_at}/>
                    {   
                        // eslint-disable-next-line
                        this.props.userID == this.props.post_owner.id?
                        <div className={classes.Actions}>
                            {
                                this.props.editing === false?
                                    <>
                                        <MdModeEdit onClick={()=>this.props.onEdit(this.props.id, this.props.body)}/>
                                        <MdDelete onClick={()=>this.props.onDelete(this.props.id)}/>
                                    </>
                                :<></>
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