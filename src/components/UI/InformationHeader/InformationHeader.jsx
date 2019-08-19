import React from 'react';
import * as classes from './InformationHeader.module.scss';
import {NavLink} from 'react-router-dom';

const InformationHeader = (props) => {
    let created_at = new Date(props.created_at);
    return(
        <header className={classes.InformationHeader}>
            <div className={classes.Info}>
                <NavLink to={`/user/${props.id}`}>
                    {props.image === "default.jpg" ?
                        <img src={`http://localhost:8000/uploaded/profile_images/${props.image}`} alt={`${props.firstName} ${props.lastName}`}/>
                        :<img src={`http://localhost:8000/storage${props.image}`} alt={`${props.firstName} ${props.lastName}`}/>
                    } 
                </NavLink>
                <div>
                    <NavLink to={`/user/${props.id}`}>
                        {`${props.firstName} ${props.lastName}`}
                    </NavLink>
                    <span>{props.position}</span>
                    {props.created_at ? <time dateTime={created_at}>{created_at.getDate()}-{created_at.getMonth()+1}-{created_at.getFullYear()} at {created_at.getHours()}:{created_at.getMinutes()<9?'0'+created_at.getMinutes():created_at.getMinutes()}</time>: null }
                </div>
            </div>
        </header>
    )
}

export default InformationHeader