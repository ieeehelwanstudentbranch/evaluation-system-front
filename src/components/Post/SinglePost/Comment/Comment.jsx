import React, { Component } from 'react';
import * as classes from './Comment.module.scss';
import { MdDelete, MdModeEdit } from "react-icons/md";
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import InformationHeader from '../../../UI/InformationHeader/InformationHeader';
class Comment extends Component{
    
    render(){
        console.log(this.props);
        return (
            <article className={classes.Comment}>
                <header>
                    <InformationHeader {...this.props.comment_owner} created_at={this.props.created_at}/>
                    {
                    // eslint-disable-next-line
                    this.props.userID == this.props.comment_owner.id?
                    <div className={classes.Actions}>
                        <>
                            <MdModeEdit onClick={()=>this.props.onEdit(this.props.id, this.props.body)}/>
                            <MdDelete onClick={()=>this.props.onDelete(this.props.id)}/>
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
        onEdit: (id, data)=> dispatch(actions.editComment(id, data)),
        onDelete: (id)=> dispatch(actions.deleteComment(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)