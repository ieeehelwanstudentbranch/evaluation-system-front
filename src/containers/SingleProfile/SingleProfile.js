import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as classes from './SingleProfile.module.scss';
import UserImage from './UserImage/UserImage';
import * as actions from '../../store/actions/index';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';
class SingleProfile extends Component {
    state={
        profileID: this.props.match.params.id
    }
    componentDidUpdate(previousProps, previousState) {
        let profileID = this.props.match.params.id;
        if (previousState.profileID !== profileID) {
            this.setState({
                profileID: profileID
            })
            this.props.onInit(this.state.profileID, this.props.userID)
        }
    }
    componentDidMount(){
        this.props.onInit(this.state.profileID, this.props.userID)
    }
    render(){
        console.log(this.props.profileData);
        return(
            <div className={classes.SingleProfile}>
                {
                    this.props.profileData?
                        <>
                            <div className={classes.MainInfo}>
                                <UserImage image={this.props.profileData.image} alt={`${this.props.profileData.firstName} ${this.props.profileData.lastName}`}/>
                                <div className={classes.data}>
                                    <h3>{this.props.profileData.firstName} {this.props.profileData.lastName}</h3>
                                    {this.props.profileData.committee?<span>{this.props.profileData.committee}</span>:null}
                                    <span>{this.props.profileData.position}</span>
                                    {this.props.profileData.ex_options?<span>{this.props.profileData.ex_options}</span>:null}
                                </div>
                            </div>
                            <AdditionalInfo email={this.props.profileData.email} faculty={this.props.profileData.faculty} university={this.props.profileData.university} phone={this.props.profileData.phone} address={this.props.profileData.address} DOB={this.props.profileData.DOB} level={this.props.profileData.level} />
                        </>
                    :<></>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id:null,
        profileData: state.user.profile?state.user.profile:null
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onInit: (profileID,userID)=>dispatch(actions.fetchUserData(profileID,userID))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SingleProfile)