import React from 'react';
import classes from './Task.module.scss';
import { NavLink } from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md'
const task = (props) => {
    console.log(props)
    return(
        <NavLink className={classes.TaskLink} to={props.link} exact={props.exact}>
            <article className={classes.Task}>
                <h3>{props.taskDetails.title}</h3>
                {/* {props.taskDetails.deliverdTime ? <p>Delivered at: <time datetime={props.taskDetails.deliverdTime}>{props.taskDetails.deliverdTime}</time></p>: null } */}
                {props.taskDetails.deadline ? <p>deadline: <time datetime={props.taskDetails.deadline}>{props.taskDetails.deadline}</time></p>: null }
                {props.taskDetails.taskDescription ? <p>{props.taskDetails.taskDescription} </p> : null}
                {props.sender ? <p>Sender Name: <span>{props.taskDetails.sender}</span></p> : null}
                {props.reviever ? <p>Volunteer Name: <span>{props.taskDetails.reviever}</span></p>: null}
                {props.score ? <span className={classes.TaskStatus}>{props.taskDetails.score}</span>: <span className={classes.TaskStatus}><MdCheckCircle/></span>}
            </article>
        </NavLink>
        
    )
}

export default task;