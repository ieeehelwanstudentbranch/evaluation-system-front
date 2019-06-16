import React from 'react';
import classes from './SideNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {MdAdd, MdCheck, MdErrorOutline, MdDeviceHub}from 'react-icons/md';

const sideNavigation = (props) => {
    return(
        <>
            <Backdrop className={classes.Backdrop} show={props.open} clicked={props.closed}/>
            <aside className={props.open? classes.Open : classes.Close}>
                <nav>
                    <ul>
                        {props.isAuthenticated ? 
                            <>
                                <NavigationItem link="/create-task">
                                    <MdAdd />
                                    Create Task
                                </NavigationItem>
                                <NavigationItem link="/completed-tasks">
                                    <MdCheck />
                                    Completed Tasks
                                </NavigationItem>
                                <NavigationItem link="/pending-tasks">
                                    <MdErrorOutline />
                                    Pending Tasks    
                                </NavigationItem>
                                <NavigationItem link="/committees">
                                    <MdDeviceHub />
                                    Committees    
                                </NavigationItem>
                            </> :
                            <null />
                        }
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default sideNavigation;