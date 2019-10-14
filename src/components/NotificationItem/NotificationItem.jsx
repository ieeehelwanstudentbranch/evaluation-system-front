import React from 'react';
import * as classes from './NotificationItem.module.scss';
import {Link} from 'react-router-dom';

const NotificationItem = (props) =>{
    return(
        <div className={[classes.NotificationItem, props.className].join(' ')}>
            <Link to={`/user/${props.from.id}`}>
                {
                    props.from.image === "default.jpg" ?
                        <img src={`http://localhost:8000/uploaded/profile_images/${props.from.image}`} alt={`${props.from.first_name} ${props.from.last_name}`}/>
                        :<img src={`http://localhost:8000/storage/${props.from.image}`} alt={`${props.from.first_name} ${props.from.last_name}`}/>
                }
            </Link>
            <Link to={`/post/${props.parent_id}`}>
                <p>{props.from.first_name} {props.content}</p>
                <time dateTime={props.created_at}>{props.created_at}</time>
            </Link>
        </div>
    )
}

export default NotificationItem;