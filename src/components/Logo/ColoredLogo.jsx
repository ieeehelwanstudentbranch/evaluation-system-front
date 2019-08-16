import React from 'react';
import ColoredLogo from '../../assets/images/colored-logo.png';
import classes from './Logo.module.scss';
const coloredLogo = (props)=>(
    <div className={[classes.Logo, props.className].join(' ')} style={{height: props.height}}>
        <img src={ColoredLogo} alt="IEEE Helwan Student Branch"/>
    </div>
);

export default coloredLogo;