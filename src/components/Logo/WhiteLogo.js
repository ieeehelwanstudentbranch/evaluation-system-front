import React from 'react';
import WhiteLogo from '../../assets/images/white-logo.png';
import classes from './Logo.module.scss';
const whiteLogo = (props)=>(
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={WhiteLogo} alt="IEEE Helwan Student Branch"/>
    </div>
);

export default whiteLogo;