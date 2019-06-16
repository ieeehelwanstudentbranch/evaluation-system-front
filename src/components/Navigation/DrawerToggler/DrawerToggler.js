import React from 'react';
import classes from './DrawerToggler.module.scss';
import {MdMenu, MdClose} from 'react-icons/md';

const drawerToggle = (props)=>(
    <div className={classes.MenuIcon} onClick={props.clicked}>
        {props.MobileMenuOpen?<MdClose  clicked={props.drawerToggleClicked}/>: <MdMenu  clicked={props.drawerToggleClicked}/>}
    </div>
);

export default drawerToggle;