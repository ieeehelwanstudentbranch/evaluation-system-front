import React from 'react';
import * as classes from './InformationTemplate.module.scss';

const informationTemplate =(props)=>(
    <div className={classes.Template}>
        <span className={classes.Label}>{props.label}</span>
        {props.children}
    </div>
)


export default informationTemplate 