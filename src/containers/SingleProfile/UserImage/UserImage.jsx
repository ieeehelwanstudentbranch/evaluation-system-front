import React, {Component} from 'react';
import * as classes from './UserImage.module.scss';
import {MdCameraAlt} from 'react-icons/md';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
class UserImage extends Component {
    render(){
        return(
            <div className={classes.UserImage}>
                {
                    this.props.image === "default.jpg" ?
                        <img src={`http://localhost:8000/uploaded/profile_images/${this.props.image}`} alt={`${this.props.name}`}/>
                        :<img src={`http://localhost:8000/storage${this.props.image}`} alt={`${this.props.name}`}/>
                }
                <div className={classes.Overlay}>
                    <MdCameraAlt onClick={this.props.editImage}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        editImage: ()=>dispatch(actions.editProfileImage())
    }
}
export default connect(null, mapDispatchToProps)(UserImage);