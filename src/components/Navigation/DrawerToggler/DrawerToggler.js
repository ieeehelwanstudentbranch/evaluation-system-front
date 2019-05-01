import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classes from './DrawerToggler.module.scss';

const drawerToggle = (props)=>(
    
    <div className={classes.MenuIcon} onClick={props.clicked}>
        <FontAwesomeIcon icon={props.MobileMenuOpen? faTimes : faBars} clicked={props.drawerToggleClicked}/>
    </div>
);

export default drawerToggle;