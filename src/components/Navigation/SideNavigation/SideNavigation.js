import React from 'react';
import classes from './SideNavigation.module.scss';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

const sideNavigation = () => (
    <aside>
        <nav>
            <ul className={classes.Sidebar}>
                <NavigationItem link="/" exact>Create Task</NavigationItem>
                <NavigationItem link="/completed-tasks">Completed Tasks</NavigationItem>
                <NavigationItem link="/pending-tasks">Pending Tasks</NavigationItem>
                <NavigationItem link="/committees">Committees</NavigationItem>
            </ul>
        </nav>
    </aside>
    
);

export default sideNavigation;