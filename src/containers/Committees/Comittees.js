import React,{Component} from 'react';
import Committee from '../../components/Committee/Committee';
import Modal from '../../components/UI/Modal/Modal';
import CommitteeForm from '../../components/Committee/CommitteeForm/CommitteeForm';

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
                <div>
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" editing={this.editingHandler}/>
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
                    <Committee mentor="Mahmoud Khaled" director="Mohamed Emad" hr_od="Pola" numberOfVolunteers="20" />
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