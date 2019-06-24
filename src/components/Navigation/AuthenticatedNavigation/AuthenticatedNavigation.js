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
                    <NavigationItem link="/" exact>Home</NavigationItem>
                    <NavigationItem link="/logout" exact>Logout</NavigationItem>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    if(state.user.userData){
        return {
            userID: state.user.userData.id
        }
    }
}

export default connect (mapStateToProps, null)(AuthenticatedNavigation);