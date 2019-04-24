import React from 'react';
import Logo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.scss';
const logo = (props)=>(
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={Logo} alt="Burger Builder"/>
    </div>
);

export default logo;