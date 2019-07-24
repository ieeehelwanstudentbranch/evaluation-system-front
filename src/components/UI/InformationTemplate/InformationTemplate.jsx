import React from 'react';
import * as classes from './InformationTemplate.module.scss';

const informationTemplate =(props)=>(
    <div className={props.className?[classes.Template, props.className].join(' '): classes.Template} style={props.style?{...props.style}:null}>
        <span className={classes.Label}>{props.label}</span>
        {props.children}
    </div>
)


export default informationTemplate 