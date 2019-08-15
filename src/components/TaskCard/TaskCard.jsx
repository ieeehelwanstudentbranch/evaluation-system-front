import React from 'react';
import classes from './TaskCard.module.scss';
import { NavLink } from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';

const task = (props) => {
    
    let deadline = new Date(props.deadline);
    let createdTime = new Date(props.create_at);
    let deliveredTime = new Date(props.deliver_at);
    return(
        <article className={classes.Card}>
            {props.title?<NavLink className={classes.TaskLink} to={`/task/${props.id}`} exact={props.exact} style={{padding: '5px 0'}}>
                <h3>{props.title.substring(0, 20)}...</h3>
            </NavLink>:null}
            
            {props.create_at ? <p>Creating Time: <time dateTime={createdTime}>{createdTime.getDate()}-{createdTime.getMonth()+1}-{createdTime.getFullYear()} at {createdTime.getHours()}:{createdTime.getMinutes()<9?'0'+createdTime.getMinutes():createdTime.getMinutes()}</time></p>: null }
            {props.deadline ? <p>Deadline: <time dateTime={deadline}>{deadline.getDate()}-{deadline.getMonth()+1}-{deadline.getFullYear()} at {deadline.getHours()}:{deadline.getMinutes()<9?'0'+deadline.getMinutes():deadline.getMinutes()}</time></p>: null }
            {props.deliver_at ? <p>Delivering Time: <time dateTime={deliveredTime}>{deliveredTime.getDate()}-{deliveredTime.getMonth()+1}-{deliveredTime.getFullYear()} at {deliveredTime.getHours()}:{deliveredTime.getMinutes()<9?'0'+deliveredTime.getMinutes():deliveredTime.getMinutes()}</time></p>: null }
            {
                props.sender_info ?
                    <p>Sender Name: <NavLink className={classes.TaskLink} to={`/user/${props.sender_info[0].id}`}>
                            <span>{`${props.sender_info[0].firstName} ${props.sender_info[0].lastName}`}</span>
                        </NavLink>
                    </p>
                :null
            }
            {
                props.receiver_info ?
                    <p>Receiver Name: <NavLink className={classes.TaskLink} to={`/user/${props.receiver_info[0].id}`}>
                            <span>{`${props.receiver_info[0].firstName} ${props.receiver_info[0].lastName}`}</span>
                        </NavLink>
                    </p>
                :null
            }
            {
                (props.task_status === 'deliver')? 
                    <span className={classes.TaskStatus}><MdCheckCircle/></span>
                :null
            }
            {
                props.committee ?
                    props.committee.length>0 ?
                        <p>Committee: <NavLink className={classes.TaskLink} to={`/committee/${props.committee[0].id}`}>
                                <span>{`${props.committee[0].name}`}</span>
                            </NavLink>
                        </p>
                    :null
                :null
            }
        </article>
    )
}
export default task;