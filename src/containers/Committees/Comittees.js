import React,{Component} from 'react';
import Committee from '../../components/Committee/Committee';
import Modal from '../../components/UI/Modal/Modal';
import CommitteeForm from '../../components/Committee/CommitteeForm/CommitteeForm';
import classes from './Committees.module.scss';
import {MdAdd} from 'react-icons/md';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

class Committees extends Component{
    state={
        editing: false,
        adding: false
    }
    componentDidMount(){
        this.props.onInit()
    }

    editingHandler = () =>{
        this.setState({editing: true});
    }

    CancelHandler=()=>{
        this.setState({
            editing: false,
            adding: false
        })
    }

    addCommitteeHandler = () =>{
        this.setState({adding: true});
    }

    render(){
        return (
            <>
                <div className={classes.Committees}>
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" editing={this.editingHandler}/>
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <MdAdd className={classes.AddCommittee} onClick={this.addCommitteeHandler}/>
                </div>
                {
                    <Modal show={this.state.editing||this.state.adding} modalClosed={this.CancelHandler}>
                        <CommitteeForm adding={this.state.adding}/>
                    </Modal>
                }
            </>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return{
        onInit: ()=> dispatch(actions.initializeCommittees())
    }
}
export default connect(null, mapDispatchToProps)(Committees);