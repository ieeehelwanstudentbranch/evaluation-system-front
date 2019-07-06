import React, {Component} from 'react';
import * as classes from './UserImage.module.scss';
import {MdCameraAlt} from 'react-icons/md';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
class UserImage extends Component {
    render(){
        return(
            <div className={classes.UserImage}>
                <img src={`http://localhost:8000/storage${this.props.image}`} alt={this.props.alt} />
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