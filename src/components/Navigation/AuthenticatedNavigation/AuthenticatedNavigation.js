import React from 'react';
import classes from './AuthenticatedNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem'

const authenticatedNavigation = () => (
    <nav>
        <ul className={classes.AuthenticatedNavigation}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/profile" exact>Profile</NavigationItem>
        </ul>
    </nav>
);

export default authenticatedNavigation;