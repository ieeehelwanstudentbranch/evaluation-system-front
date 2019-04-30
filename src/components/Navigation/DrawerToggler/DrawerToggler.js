import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const drawerToggle = (props)=>(
    
    <div onClick={props.clicked}>
        <FontAwesomeIcon icon={props.MobileMenuOpen? faTimes : faBars} clicked={props.drawerToggleClicked}/>
    </div>
);

export default drawerToggle;