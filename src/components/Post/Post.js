import React, { Component } from 'react';
import * as classes from './Post.module.scss';
import {NavLink} from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
import axios from '../../axios';

class Post extends Component{
    render(){
        return (
            <article className={classes.Post}>
                <header>
                    {/* <div className={classes.Info}>
                        <img src={this.props.postOwner.image} alt={`${this.props.postOwner.firstName} ${this.props.postOwner.lastName}`}/>
                        <NavLink to="">{`${this.props.postOwner.firstName} ${this.props.postOwner.lastName}`}</NavLink>
                        <span>{this.props.postOwner.position}</span>
                    </div> */}
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