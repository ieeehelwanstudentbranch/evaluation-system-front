import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount(){
        let token = this.props.token;
        token = token.replace('bearer ', '').trim();
        this.props.onLogout(token)
    }
    render() {
        return <Redirect to="/" />        
    }
}
const mapStateToProps = state => {
    return {
        token: state.login.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: (token)=> dispatch(actions.logout(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);