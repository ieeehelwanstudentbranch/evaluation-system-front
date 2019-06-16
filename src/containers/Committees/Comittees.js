import React,{Component} from 'react';
import Committee from '../../components/Committee/Committee';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import CommitteeForm from '../../components/Committee/CommitteeForm/CommitteeForm';
import classes from './Committees.module.scss';
import {MdAdd} from 'react-icons/md';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';

class Committees extends Component{
    state={
        editing: false,
        adding: false,
        error: null,
        committeeData: {
            name: '',
            mentor: '',
            director: '',
            hr_od: ''
        }
    }
    // initializing committeess component by calling all committees
    componentDidMount(){
        this.props.onInit()
    }

    componentDidUpdate(previousProps, previousState){
        let error = this.props.error;
        if (previousState.error !== error) {
            this.setState({
                error: error
            })
        }
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
            adding: false,
            error: null,
            committeeData: {
                name: '',
                mentor: '',
                director: '',
                hr_od: ''
            },
        })
    }

    render(){
        let committees = this.props.committees;
        let committeeComponent;
        if(this.props.error){
            committeeComponent = <Modal show={this.state.error} modalClosed={this.CancelHandler}>
                {this.state.error.message}
            </Modal>
        } else if (this.props.loading){
            committeeComponent = <Spinner />
        } else {
            if (committees!==null){
                committeeComponent = committees.map(committee=>(
                    <>
                    {console.log(committee)}
                    <Committee key={committee.id} name={committee.name} mentor={committee.mentor} director={committee.director} hr_od={committee.hr_od} editing={()=>this.editingHandler(committee)}/>
                    </>
                ))
            } else {
                committeeComponent = 
                <Modal show={true} modalClosed={this.CancelHandler}>
                    <p>Some thing went error, please try again later</p>
                </Modal>
            }
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