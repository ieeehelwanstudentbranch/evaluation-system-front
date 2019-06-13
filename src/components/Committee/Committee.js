import React from 'react';
import classes from './Committee.module.scss';
// import { NavLink } from 'react-router-dom';
import { GiSettingsKnobs } from "react-icons/gi";
const committee = (props) => {
    return(
        <article className={classes.Committee} >
            <GiSettingsKnobs  className={classes.CommitteeSettings} onClick={props.editing}/>
            <h3>COMMITTEE NAME</h3>
            {props.mentor ? <p>Mentor: <span>{props.mentor}</span></p> : null}
            {props.director ? <p>Director: <span>{props.director}</span></p> : null}
            {props.hr_od ? <p>HR-Coordinator: <span>{props.hr_od}</span></p> : null}
            {props.numberOfVolunteers ? <p>Number Of Volunteers: <span>{props.numberOfVolunteers}</span></p> : null}
        </article>

    )
    
}

export default committee;