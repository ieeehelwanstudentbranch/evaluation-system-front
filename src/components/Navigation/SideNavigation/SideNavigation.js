import React from 'react';
import classes from './SideNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faFolder, faGopuram } from '@fortawesome/free-solid-svg-icons';

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
                                    <FontAwesomeIcon icon={faPlus} />
                                    Create Task
                                </NavigationItem>
                                <NavigationItem link="/completed-tasks">
                                    <FontAwesomeIcon icon={faCheck} />
                                    Completed Tasks
                                </NavigationItem>
                                <NavigationItem link="/pending-tasks">
                                    <FontAwesomeIcon icon={faFolder} />
                                    Pending Tasks    
                                </NavigationItem>
                                <NavigationItem link="/committees">
                                    <FontAwesomeIcon icon={faGopuram} />
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