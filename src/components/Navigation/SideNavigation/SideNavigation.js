import React from 'react';
import classes from './SideNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faGopuram } from '@fortawesome/free-solid-svg-icons';

const sideNavigation = () => (
    <aside>
        <nav>
            <ul>
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
            </ul>
        </nav>
    </aside>
    
);

export default sideNavigation;