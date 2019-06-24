import React from 'react';
import classes from './AuthenticatedNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import Profile from '../../Profile/Profile';

const authenticatedNavigation = () => (
    <nav>
        <ul className={classes.AuthenticatedNavigation}>
            <NavigationItem link="/profile" exact><Profile /></NavigationItem>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/logout" exact>Logout</NavigationItem>
        </ul>
    </nav>
);

export default authenticatedNavigation;