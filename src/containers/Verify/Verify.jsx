import React, { Component } from 'react';
import * as classes from './Verify.module.scss';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios';
import {Redirect} from 'react-router-dom'
class Verify extends Component {
    state={
        error: null
    }

    activateAccount = () => {
        let confirmationCode = this.props.match.params.code.trim();
        axios.get(`register/verify/${confirmationCode}`)
            .then(response=>{
                if(response.status === 200){
                    this.setState({Redirect: true})
                }
            }).catch(error=>{
                this.setState({error: error.response.date})
            })
    }

    cancelActivation = () => {
        this.setState({Message: 'account activation has been delayed to later you can access link again and activate it later. you will be Redirected in a Minutes to home.'});
        setTimeout(()=>{
            this.setState({Redirect: true})
        }, 60000)
    }

    render(){
        return(
            this.state.Redirect === true ?
            <Redirect to="/" />
            :
            <div className={classes.Verify}>
                <div className={classes.VerificationMessage}>
                    <h2>Are you Ready to Activate this account?</h2>
                    <div className={classes.Actions}>
                        <Button className={classes.Action} btnType="Success" clicked={this.activateAccount}>Yes</Button>
                        <Button className={classes.Action} btnType="Danger" clicked={this.cancelActivation}>No</Button>
                    </div>
                </div>
                <p className={classes.Message}>{this.state.Message}</p>
                <p className={classes.Error}>{this.state.error}</p>
            </div>
        )
    }
}
export default Verify;
