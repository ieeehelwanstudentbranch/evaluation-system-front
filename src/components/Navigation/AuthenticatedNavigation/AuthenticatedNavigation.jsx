import React from 'react';
import classes from './AuthenticatedNavigation.module.scss';
import NavigationItem from '../NavigationItem/NavigationItem';
import Profile from '../../Profile/Profile';
import {connect} from 'react-redux';

class AuthenticatedNavigation extends React.Component{
    render(){
        return(
            <nav>
                <ul className={classes.AuthenticatedNavigation}>
                    <NavigationItem link={`/user/${this.props.userID}`} exact><Profile /></NavigationItem>
                    <NavigationItem link="/home" exact>Home</NavigationItem>
                    <NavigationItem link="/logout" exact>Logout</NavigationItem>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.user.userData? state.user.userData.id:null
    }
}

export default connect (mapStateToProps, null)(AuthenticatedNavigation);