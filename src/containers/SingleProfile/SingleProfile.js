import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as classes from './SingleProfile.module.scss';
import UserImage from './UserImage/UserImage';
import * as actions from '../../store/actions/index';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
import Modal from '../../components/UI/Modal/Modal';
import ImageCropper from '../../components/ImageCropper/ImageCropper';
import Button from '../../components/UI/Button/Button';
import ProfileDataForm from '../../components/ProfileDataForm/ProfileDataForm'
class SingleProfile extends Component {

    state={
        profileID: this.props.match.params.id,
        editing: this.props.editing,
        editableContent: this.props.editing,
        newImage: this.props.newImage
    }

    componentDidUpdate(previousProps, previousState) {
        let profileID = this.props.match.params.id;
        let editing = this.props.editing;
        let editableContent= this.props.editing;
        let newImage= this.props.newImage;
        if (previousState.profileID !== profileID) {
            this.setState({
                profileID: profileID,
            })
            this.props.onInit(this.state.profileID, this.props.userID)
        }
        if (previousState.editing !== editing || previousState.editableContent !== editableContent|| previousState.newImage !== newImage) {
            this.setState({
                editing: editing,
                editableContent: editableContent,
                newImage: newImage
            })
        }
    }

    componentDidMount(){
        this.props.onInit(this.state.profileID, this.props.userID)
    }
    
    render(){
        console.log(this.props.profileData);
        let profile;
        if (this.props.profileData){
            profile = <div className={classes.SingleProfile}>
                        <div className={classes.MainInfo}>
                            <UserImage image={this.props.profileData.image} alt={`${this.props.profileData.firstName} ${this.props.profileData.lastName}`}/>
                            <div className={classes.data}>
                                <h3>{this.props.profileData.firstName} {this.props.profileData.lastName}</h3>
                                {this.props.profileData.committee?<span>{this.props.profileData.committee}</span>:null}
                                <span>{this.props.profileData.position}</span>
                                {this.props.profileData.ex_options?<span>{this.props.profileData.ex_options[0].ex_options.toUpperCase()}</span>:null}
                            </div>
                        </div>
                        <AdditionalInfo email={this.props.profileData.email} faculty={this.props.profileData.faculty} university={this.props.profileData.university} phone={this.props.profileData.phone} address={this.props.profileData.address} DOB={this.props.profileData.DOB} level={this.props.profileData.level} />
                    </div>
        }
        return(
            <>
                {profile}
                {
                    <Modal show={this.state.editing} modalClosed={this.props.cancelEditing}>
                        {this.props.editableContent === 'profileImage'?
                            this.props.profileData.image?
                                <>
                                    <ImageCropper image={this.props.profileData.image}/>
                                    <Button type="submit" btnType="Default" clicked={()=>this.props.uploadImage(this.props.userID, this.props.newImage)}>UPLOAD</Button>
                                </>
                            :null
                        :null}
                        {this.props.editableContent === 'profileData'?
                            this.props.profileData.image?
                                <>
                                    <ProfileDataForm initialValues={this.props.profileData}/>
                                </>
                            :null
                        :null}
                    </Modal>
                }
            </>
        )
    }
}
const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id:null,
        profileData: state.user.profile?state.user.profile:null,
        editing: state.user.editing,
        editableContent: state.user.editableContent,
        newImage: state.user.newImage?state.user.newImage:null
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onInit: (profileID,userID)=>dispatch(actions.fetchUserData(profileID,userID)),
        cancelEditing: ()=>dispatch(actions.cancelEditing()),
        uploadImage: (profileID, newImage)=>dispatch(actions.uploadImage(profileID, newImage))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleProfile)