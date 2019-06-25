
import React, {Component} from 'react';
import * as classes from './AdditionalInfo.module.scss';
import {GiSettingsKnobs} from 'react-icons/gi';
import Template from './InformationTemplate/InformationTemplate';

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
                <GiSettingsKnobs />
            </div>
        )
    }
}
export default AdditionalInfo;