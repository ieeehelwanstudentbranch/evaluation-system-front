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
        editableContent: this.props.editableContent,
        newImage: this.props.newImage,
        profileData: null
    }

    componentDidUpdate(previousProps, previousState) {
        let profileID = this.props.match.params.id;
        let editing = this.props.editing;
        let editableContent= this.props.editableContent;
        let newImage= this.props.newImage;
        let profileData = this.props.profileData;
        if (previousState.profileData !== profileData){
            this.setState({
                profileData: profileData
            })
        }
        if (previousState.profileID !== profileID) {
            this.setState({
                profileID: profileID
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
        let profile;
        if (this.state.profileData){
            profile = <div className={classes.SingleProfile}>
                        <div className={classes.MainInfo}>
                            <UserImage image={this.state.profileData.image} alt={`${this.state.profileData.firstName} ${this.state.profileData.lastName}`}/>
                            <div className={classes.Data}>
                                <h3>{this.state.profileData.firstName} {this.state.profileData.lastName}</h3>
                                {this.state.profileData.committee?<span>{this.state.profileData.committee.name}</span>:null}
                                <span>{this.state.profileData.position}</span>
                                {this.state.profileData.ex_options.length>0?<span>{this.state.profileData.ex_options[0].ex_options.toUpperCase()}</span>:null}
                            </div>
                        </div>
                        <AdditionalInfo {...this.state.profileData} />
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