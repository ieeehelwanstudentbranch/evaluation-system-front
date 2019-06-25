import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as classes from './SingleProfile.module.scss';
import UserImage from './UserImage/UserImage';
import * as actions from '../../store/actions/index';
class SingleProfile extends Component {
    state={
        userData: null
    }
    componentDidMount(){
        this.props.onInit(this.props.match.params.id, this.props.userID)
    }
    render(){
        return(
            <div className={classes.SingleProfile}>
                {
                    this.props.profileData?
                        <div className={classes.MainInfo}>
                            <UserImage image={this.props.profileData.image} alt={`${this.props.profileData.firstName} ${this.props.profileData.lastName}`}/>
                            <div className={classes.data}>
                                <h3>{this.props.profileData.firstName} {this.props.profileData.lastName}</h3>
                                {this.props.profileData.committee?<span>{this.props.profileData.committee}</span>:null}
                                <span>{this.props.profileData.position}</span>
                                {this.props.profileData.ex_options?<span>{this.props.profileData.ex_options}</span>:null}
                            </div>
                        </div>
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