import React from 'react';
import * as classes from './SideNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Profile from '../../Profile/Profile';
import {MdHome, MdAdd, MdCheck, MdErrorOutline, MdDeviceHub, MdExitToApp}from 'react-icons/md';

const sideNavigation = (props) => {
    return(
        <>
            <Backdrop className={classes.Backdrop} show={props.open} clicked={props.closed}/>
            <aside className={props.open? classes.Open : classes.Close}>
                <nav>
                    <ul>
                        {props.isAuthenticated ? 
                            <>
                                <NavigationItem link={`/user/${props.userID}`} exact><Profile /></NavigationItem>
                                <NavigationItem link="/home" className={classes.MobileOnly}>
                                    <MdHome />
                                    Home
                                </NavigationItem>
                                {
                                    props.role === 'EX_com' || props.role === 'highBoard'?
                                        <NavigationItem link="/create-task">
                                            <MdAdd />
                                            Create Task
                                        </NavigationItem>
                                    :null
                                }
                                
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
                                <NavigationItem link="/logout">
                                    <MdExitToApp />
                                    Logout
                                </NavigationItem>
                            </> :
                            <></>
                        }
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default sideNavigation;