import React from 'react';
import classes from './SideNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {MdAdd, MdCheck, MdErrorOutline, MdDeviceHub, MdExitToApp}from 'react-icons/md';

const sideNavigation = (props) => {
    return(
        <>
            <Backdrop className={classes.Backdrop} show={props.open} clicked={props.closed}/>
            <aside className={props.open? classes.Open : classes.Close}>
                <nav>
                    <ul>
                        {props.isAuthenticated ? 
                            <>
                                {
                                    props.role === 'EX_com' || props.role === 'director'?
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