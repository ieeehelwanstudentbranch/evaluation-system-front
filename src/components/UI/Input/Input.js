import React from 'react';
import classes from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faEye, faEnvelope, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

const input = (props) => {
    
    let label = null,
        element = null,
        icon = null,
        inputClasses = [classes.InputElement];

    // if(!props.elementConfig.config.valid && props.elementConfig.config.validation && props.elementConfig.config.touched){
    //     inputClasses.push(classes.Invalid);
    // }else{
    //     inputClasses.push(classes.Valid);
    // }
    if(props.elementConfig.labelName){
        label = <label className={classes.Label} htmlFor={props.id}>{props.elementConfig.config.labelName}</label>
    }
    if(props.elementConfig.icon){
        if (props.elementConfig.icon.name === 'faSearch'){
            icon = <FontAwesomeIcon className={classes.Icon} style={{right: '10px'}} icon={faSearch} />
        }else if (props.elementConfig.icon.name === 'faEye') {
            icon = <FontAwesomeIcon className={classes.Icon} icon={faEye} />
        } else if (props.elementConfig.icon.name === 'faMail' ){
            icon = <FontAwesomeIcon className={classes.Icon} icon={faEnvelope} />
        } else if (props.elementConfig.icon.name === 'faEyeSlash' ){
            icon = <FontAwesomeIcon className={classes.Icon} icon={faEyeSlash} />
        }
        
    }
    if (props.elementConfig){
        if (props.elementConfig.options){
            element = 
            <>
                <input list={props.elementConfig.id} placeholder={props.elementConfig.config.elementConfig.placeholder} className={inputClasses.join(' ')} value={props.elementConfig.config.value} onChange={props.changed}/>
                <datalist id={props.elementConfig.id} >
                {props.elementConfig.config.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}/>
                ))}
                    
                </datalist>
            </>
        } else {
            element = <input className={inputClasses.join(' ')} {...props.elementConfig}  value={props.elementConfig.value} onChange={props.changed}/>
        }
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