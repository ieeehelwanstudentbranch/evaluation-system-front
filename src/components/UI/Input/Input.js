import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
    let label = null,
        element = null,
        icon = null,
        inputClasses = [classes.InputElement];

    if(props.invalid){
        inputClasses.push(classes.Invalid);
    }else{
        inputClasses.push(classes.Valid);
    }
    if(props.labelName){
        label = <label className={classes.Label} htmlFor={props.id}>{props.labelName}</label>
    }
    if (props.elementConfig){
        element = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
        />
    }
    return (
        <div className={classes.Input}>
            {label}
            {element}
            {icon}
        </div>
    )
}
export default input;