import React, {Component} from 'react';
import * as classes from './AdditionalInfo.module.scss';
import {GiSettingsKnobs} from 'react-icons/gi';
import Template from '../../../components/UI/InformationTemplate/InformationTemplate.jsx';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
class AdditionalInfo extends Component {
    render(){
        console.log(this.props)
        return(
            <Template label='Additional Informations'>
                <div className={classes.Wrapper}>
                    <div className={classes.Row}>
                        <Template label='E-mail'>
                            <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
                        </Template>
                        {
                            this.props.phone?
                                <Template label='Phone Number'>
                                    <a href={`tel:${this.props.phone}`}>{this.props.phone}</a>
                                </Template>
                            : null
                        }
                    </div>
                    <div className={classes.Row}>
                        {
                            this.props.faculty?
                                <Template label='Faculty'>
                                    <p>{this.props.faculty}</p>
                                </Template>
                            : null
                        }
                        {
                            this.props.university?
                                <Template label='University'>
                                    <p>{this.props.university}</p>
                                </Template>
                            : null
                        }
                        {
                            this.props.level?
                                <Template label='Level'>
                                    <p>{this.props.level}</p>
                                </Template>
                            :null
                        }
                    </div>
                    {this.props.address?
                        <div className={classes.Row}>
                            <Template label='address'>
                                <p>{this.props.address}</p>
                            </Template>
                        </div>: null
                    }
                </div>
                {
                    this.props.userID === this.props.profileData.id ?
                        <GiSettingsKnobs onClick={this.props.onChange}/>
                    :null
                }
            </Template>
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