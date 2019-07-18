import React from 'react';
import classes from './Committee.module.scss';
import { NavLink } from 'react-router-dom';
import { GiSettingsKnobs } from "react-icons/gi";
const committee = (props) => {
    return(
        <article className={classes.Committee} >
            <GiSettingsKnobs className={classes.CommitteeSettings} onClick={props.editing}/>
            {props.name?<NavLink to={`committee/${props.id}`}><h3>{props.name}</h3></NavLink>:null}
            {props.mentor ? <p>Mentor: <span>{props.mentor}</span></p> : null}
            {props.director ? <p>Director: <span>{props.director}</span></p> : null}
            {props.hr_od ? <p>HR-Coordinator: <span>{props.hr_od}</span></p> : null}
            {props.numOfVolunteers ? <p>Number Of Volunteers: <span>{props.numOfVolunteers}</span></p> : null}
        </article>
    )
}

export default committee;