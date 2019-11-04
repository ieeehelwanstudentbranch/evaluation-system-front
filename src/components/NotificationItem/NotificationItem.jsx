import React from 'react';
import * as classes from './NotificationItem.module.scss';
import {Link} from 'react-router-dom';
import {endpoint} from '../../utilize/endpoint';

const NotificationItem = (props) =>{
    return(
        <div className={[classes.NotificationItem, props.className].join(' ')}>
            <Link to={`/user/${props.from.id}`}>
                {
                    props.from.image === "default.jpg" ?
                        <img src={`${endpoint}/uploaded/profile_images/${props.from.image}`} alt={`${props.from.first_name} ${props.from.last_name}`}/>
                        :<img src={`${endpoint}/storage/${props.from.image}`} alt={`${props.from.first_name} ${props.from.last_name}`}/>
                }
            </Link>
            {
                props.content.includes('post')?
                    <Link to={`/post/${props.parent_id}`}>
                        <p>{props.from.first_name} {props.content}</p>
                        <time dateTime={props.created_at}>{props.created_at}</time>
                    </Link>
                :props.content.includes('task')?
                    <Link to={`/task/${props.parent_id}`}>
                        <p>{props.from.first_name} {props.content}</p>
                        <time dateTime={props.created_at}>{props.created_at}</time>
                    </Link>
                :null
            }
            
        </div>
    )
}

export default NotificationItem;