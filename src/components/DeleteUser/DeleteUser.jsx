import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import * as actions from '../../store/actions/index';
import * as classes from './DeleteUser.module.scss';

class DeleteUser extends Component {
    render() {
        return (
            <MdDeleteForever className={classes.DeleteUser} onClick={() => this.props.onDelete(this.props.selectedID)} />
        )
    }
}

const mapStateToProps = state => {
    return {
        position: state.user.userData ? state.user.userData.position : null,
        role: state.user.userData ? state.user.userData.ex_options.ex_options : null,
        userID: state.user.userData ? state.user.userData.id : null,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDelete: (id) => dispatch(actions.deleteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)