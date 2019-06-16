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
        adding: false,
        committeeData: null
    }
    // initializing committeess component by calling all committees
    componentDidMount(){
        this.props.onInit()
    }

    addCommitteeHandler = () =>{
        this.setState({adding: true});
    }

    editingHandler = (committee) =>{
        console.log(committee);
        this.setState({
            editing: true,
            committeeData: {
                id: committee.id,
                name: committee.name,
                mentor: committee.mentor.id,
                director: committee.director,
                hr_od: committee.hr_od
            }
        });
    }

    CancelHandler=()=>{
        this.setState({
            editing: false,
            committeeData: null,
            adding: false
        })
    }

    render(){
        let committees = this.props.committees;
        let committeeComponent;
        if (committees!==null){
            committeeComponent = committees.map(committee=>(
                <>
                {console.log(committee)}
                <Committee key={committee.id} name={committee.name} mentor={committee.mentor} director={committee.director} hr_od={committee.hr_od} editing={()=>this.editingHandler(committee)}/>
                </>
            ))
        } else {
            committeeComponent = <p>There is no committee yet </p>
        }

        return (
            <>
                <div className={classes.Committees}>
                    {committeeComponent}
                    <MdAdd className={classes.AddCommittee} onClick={this.addCommitteeHandler}/>
                </div>
                {
                    <Modal show={this.state.editing||this.state.adding} modalClosed={this.CancelHandler}>
                        <CommitteeForm committeeData={this.state.committeeData} adding={this.state.adding}/>
                    </Modal>
                }
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        committees: state.committees.committees,
        loading: state.committees.loading,
        error: state.committees.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInit: ()=> dispatch(actions.initializeCommittees())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Committees);