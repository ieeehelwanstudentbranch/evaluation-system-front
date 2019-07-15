import React, {Component} from 'react';
import * as classes from './AdditionalInfo.module.scss';
import {GiSettingsKnobs} from 'react-icons/gi';
import Template from './InformationTemplate/InformationTemplate';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
class AdditionalInfo extends Component {
    render(){
        return(
            <div className={classes.AdditionalInfo}>
                <span className={classes.Label}>Additional Informations</span>
                <div className={classes.Wrapper}>
                    <div className={classes.Row}>
                        <Template marginTop="-5%" label='E-mail' value={this.props.email}/>
                        {
                            this.props.phone?
                            <Template marginTop="-5%" label='Phone Number' value={this.props.phone}/>: null
                        }
                    </div>
                    <div className={classes.Row}>
                        {
                            this.props.faculty?
                            <Template marginTop="-8%" label='Faculty' value={this.props.faculty}/>: null
                        }
                        {
                            this.props.university?
                            <Template marginTop="-8%" label='University' value={this.props.university}/>: null
                        }
                        {
                            this.props.level?
                            <Template marginTop="-8%" label='Level' value={this.props.level}/>: null
                        }
                    </div>
                    {this.props.address?
                        <div className={classes.Row}>
                            <Template marginTop="-2.5%" label='address' value={this.props.address}/>
                        </div>: null
                    }
                </div>
                {
                    this.props.userID === this.props.profileData.id ?
                        <GiSettingsKnobs onClick={this.props.onChange}/>
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
        onChange: ()=>dispatch(actions.editProfileData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo);