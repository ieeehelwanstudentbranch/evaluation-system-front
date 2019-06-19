import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as classes from './Post.module.scss';
import {NavLink} from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
import * as actions from '../../store/actions/index';
import axios from '../../axios';

class Post extends Component{
    render(){
        return (
            <article className={classes.Post}>
                <header>
                    <div className={classes.Info}>
                        {/* <img src={this.state.postOwner.image} alt={`${this.state.postOwner.firstName} ${this.state.postOwner.lastName}`}/> */}
                        <NavLink>Mohamed Emad</NavLink>
                        <span>{this.props.position}</span>
                    </div>
                    <div className={classes.Actions}>
                        <MdModeEdit />
                        <MdDelete />
                    </div>
                </header>
                <div dangerouslySetInnerHTML={{__html: this.props.body}} className={classes.Content}></div>
            </article>
        )
    }
}

export default Post;