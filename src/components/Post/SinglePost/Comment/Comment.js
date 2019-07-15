import React, { Component } from 'react';
import * as classes from './Comment.module.scss';
import {NavLink} from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
class Comment extends Component{
    render(){
        return (
            <article className={classes.Comment}>
                <header>
                    <div className={classes.Info}>
                        <NavLink to=""><img src={`http://localhost:8000/uploaded/profile_images/${this.props.commentOwner.image}`} alt={`${this.props.commentOwner.firstName} ${this.props.commentOwner.lastName}`}/></NavLink>
                        <div>
                            <NavLink to="">{`${this.props.commentOwner.firstName} ${this.props.commentOwner.lastName}`}</NavLink>
                            <span>{this.props.commentOwner.position}</span>
                            <time dateTime={this.props.date_time}>{this.props.date_time}</time>
                        </div>
                    </div>
                    {
                        // eslint-disable-next-line
                        this.props.userID == this.props.commentOwner.user_id?
                        <div className={classes.Actions}>
                            <>
                                <MdModeEdit onClick={()=>this.props.onEdit(this.props.id, this.props.body)}/>
                                <MdDelete onClick={()=>this.props.onDelete(this.props.postID)}/>
                            </>
                        </div>
                        : <></>
                    }
                </header>
                <div className={classes.Content}>{this.props.body}</div>
            </article>
        )
    }
}

const mapStateToProps = state => {
    return{
        userID: state.login.userID,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onEdit: (id, data)=> dispatch(actions.editComment(id, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)