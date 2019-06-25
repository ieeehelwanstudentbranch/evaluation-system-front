import React, {Component} from 'react';
import * as classes from './UserImage.module.scss';
import {MdCameraAlt} from 'react-icons/md';

class UserImage extends Component {
    render(){
        return(
            <div className={classes.UserImage}>
                <img src={`http://localhost:8000/uploaded/profile_images/${this.props.image}`} alt={this.props.alt} />
                <div className={classes.Overlay}>
                    <MdCameraAlt />
                </div>
            </div>
        )
    }
}
export default UserImage;