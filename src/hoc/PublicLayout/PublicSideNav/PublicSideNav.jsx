import React from 'react';
import classes from './PublicSideNav.module.scss';
import AnonymousNavigation from '../../../components/Navigation/AnonymousNavigation/AnonymousNavigation';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';

const publicSideNavigation = (props) => {
    let attachedClasses = [classes.PublicSideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.PublicSideDrawer, classes.Open];
    }
    return(
        <div className={props.className}>
            <Backdrop className={classes.Backdrop} show={props.open} clicked={props.closed}/>
            <aside className={attachedClasses.join(' ')}>
                <AnonymousNavigation />
            </aside>
        </div>
    );
};

export default publicSideNavigation;