import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss';
const navigationItem = (props) => (
    <li className={[classes.NavigationItem, props.className].join(' ')}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
            href={props.href}
            as={props.as}
        >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem