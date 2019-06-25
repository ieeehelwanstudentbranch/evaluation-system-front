import React from 'react';
import * as classes from './InformationTemplate.module.scss';

const informationTemplate =(props)=>(
    <div className={classes.Template}>
        <span className={classes.Label} style={{marginTop : `${props.marginTop}`}}>{props.label}</span>
        <p>{props.value}</p>
    </div>
)


export default informationTemplate 