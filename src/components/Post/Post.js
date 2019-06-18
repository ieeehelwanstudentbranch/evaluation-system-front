import React from 'react';
import * as classes from './Post.module.scss';
import {NavLink} from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
const post = (props) => {
    return (
        <article className={classes.Post}>
            <header>
                <div className={classes.Info}>
                    <img src={props.img} alt={props.postOwner}/>
                    <NavLink >Mohamed Emad</NavLink>
                </div>
                <div className={classes.Actions}>
                    <MdModeEdit />
                    <MdDelete />
                </div>
            </header>
            <div dangerouslySetInnerHTML={{__html: props.body}} className={classes.Content}></div>
        </article>
    )
}
export default post;