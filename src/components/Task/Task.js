import React from 'react';
import classes from './Task.module.scss';
import { NavLink } from 'react-router-dom';
const task = (props) => {
    return(
        <NavLink className={classes.TaskLink} to={props.link} exact={props.exact}>
            <article className={classes.Task}>
                <h3>Task Title</h3>
                <p>Delivered at: <time datetime="2016-08-09 08:00">Tuesday at 8:00 AM</time></p>
                <p>Deadline: <time datetime="2016-08-09 08:00">Tuesday at 8:00 AM</time></p>
                <p>Welcome to your second family this is your first task in our crew.. </p>
                <p>Sender Name: <span>{props.Sender}</span></p>
                <p>Volunteer Name: <span>{props.Volunteer}</span></p>
                <span className={classes.TaskScore}>90</span>
            </article>
        </NavLink>
        
    )
    
}

export default task;