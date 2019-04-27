import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = () => (
    <nav>
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/login" exact>Login</NavigationItem>
            <NavigationItem link="/registration" exact>Registration</NavigationItem>
        </ul>
    </nav>
);

export default navigationItems;