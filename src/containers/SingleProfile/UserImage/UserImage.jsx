import React, {Component} from 'react';
import * as classes from './UserImage.module.scss';
import {MdCameraAlt} from 'react-icons/md';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {endpoint} from '../../../utilize/endpoint';

class UserImage extends Component {
    render(){
        return(
            <div className={classes.UserImage}>
                {
                    this.props.image === "default.jpg" ?
                        <img src={`${endpoint}/uploaded/profile_images/${this.props.image}`} alt={`${this.props.name}`}/>
                        :<img src={`${endpoint}/storage${this.props.image}`} alt={`${this.props.name}`}/>
                }
                {
                    this.props.userID === this.props.profileData.id ?
                        <div className={classes.Overlay}>
                            <MdCameraAlt onClick={this.props.editImage}/>
                        </div>
                    :null
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id:null,
        profileData: state.user.profile?state.user.profile:null,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        editImage: ()=>dispatch(actions.editProfileImage())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserImage);