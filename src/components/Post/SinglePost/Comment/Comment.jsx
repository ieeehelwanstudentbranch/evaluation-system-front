import React, { Component } from 'react';
import * as classes from './Comment.module.scss';
import { MdDelete, MdModeEdit } from "react-icons/md";
import {connect} from 'react-redux';
import InformationHeader from '../../../UI/InformationHeader/InformationHeader';
class Comment extends Component{

    render(){
        return (
            <article className={classes.Comment}>
                <header>
                    <InformationHeader {...this.props.comment_owner} created_at={this.props.created_at}/>
                    {
                    // eslint-disable-next-line
                    this.props.userID == this.props.comment_owner.id?
                    <div className={classes.Actions}>
                        <>
                            <MdModeEdit onClick={()=>this.props.editComment(this.props.id)}/>
                            <MdDelete onClick={()=>this.props.deleteComment(this.props.id)}/>
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

export default connect(mapStateToProps)(Comment)