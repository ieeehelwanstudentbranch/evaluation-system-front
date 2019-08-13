import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Login from './Login/Login';
import Register from './Registration/Registration';
class Auth extends Component {
    state = {
        register: false
    }

    registerCancelHandler=()=>{
        this.setState({register: false})
    }

    registerHandler = () =>{
        this.setState({register: true});
    }

    render(){
        return (
            <div>
                <Login />
                Don't have account? <a onClick={this.registerHandler}>SignUp</a>
                <Modal show={this.state.register} modalClosed={this.registerCancelHandler}>
                    <Register />
                </Modal>
            </div>
        )
    }
}

export default Auth;