import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MdDeleteForever} from 'react-icons/md'

class DeleteUser extends Component{
    render(){
        return(
            <MdDeleteForever />
        )
    }
}

const mapStateToProps = state => {
    return {
        position: state.user.userData? state.user.userData.position:null,
        role: state.user.userData? state.user.userData.ex_options.ex_options:null,
        userID: state.user.userData?state.user.userData.id:null,
        profileID: state.user.profile?state.user.profile.id:null,
    }
}
const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)