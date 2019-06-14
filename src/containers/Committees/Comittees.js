import React,{Component} from 'react';
import Committee from '../../components/Committee/Committee';
import Modal from '../../components/UI/Modal/Modal';
import CommitteeForm from '../../components/Committee/CommitteeForm/CommitteeForm';
import classes from './Committees.module.scss';
import {MdAdd} from 'react-icons/md'
class Committees extends Component{
    state={
        editing: false
    }

    editingHandler = () =>{
        this.setState({editing: true});
    }

    editingCancelHandler=()=>{
        this.setState({editing: false})
    }

    render(){
        return (
            <>
                <div className={classes.Committees}>
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" editing={this.editingHandler}/>
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <MdAdd className={classes.AddCommittee}/>
                </div>
                {
                    <Modal show={this.state.editing} modalClosed={this.editingCancelHandler}>
                        <CommitteeForm />
                    </Modal>
                }
            </>
        )
    }
}

export default Committees;