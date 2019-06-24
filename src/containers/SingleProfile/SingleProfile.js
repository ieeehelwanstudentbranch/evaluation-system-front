import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as classes from './SingleProfile.module.scss';
import UserImage from './UserImage/UserImage';
class SingleProfile extends Component {
    render(){
        return(
            <div className={classes.SingleProfile}>
                <UserImage />
            </div>
        )
    }
}
export default SingleProfile