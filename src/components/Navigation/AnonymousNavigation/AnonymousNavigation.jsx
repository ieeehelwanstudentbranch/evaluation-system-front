import React from 'react';
import classes from './AnonymousNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem'

const AnonymousNavigation = () => (
    <nav>
        <ul className={classes.AnonymousNavigation}>
            <NavigationItem link="/login" exact>Login</NavigationItem>
            <NavigationItem link="/registration" exact>Registration</NavigationItem>
        </ul>
    </nav>
);

export default AnonymousNavigation;