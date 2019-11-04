import React, { Component } from 'react';
import * as classes from './SingleTask.module.scss';
import axios from '../../axios';
import {connect} from 'react-redux';
import InformationTemplate from '../../components/UI/InformationTemplate/InformationTemplate';
import Button from '../../components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import ReviewTask from '../../components/ReviewTask/ReviewTask';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import DeliverTask from '../DeliverTask/DeliverTask';
import TaskDetails from '../../components/UI/Tasks/TaskDetails/TaskDetails'

class SingleTask extends Component{
    state={
        id: null,
        review: false
    }
    componentDidMount(){
        axios.get(`${this.props.location.pathname}`)
            .then(response=>{
                this.setState({
                    id: this.props.match.params.id,
                    status: response.data.data.status,
                    sender_info: response.data.data.sender_info[0],
                    receiver_info: response.data.data.receiver_info[0],
                    datesObjects: { 
                        created_at: response.data.data.created_at.date,
                        deadline: response.data.data.deadline,
                        delivered_at: response.data.data.delivered_at.date,
                    },
                    sentData: {
                        title: response.data.data.title,
                        details: response.data.data.details,
                        files: response.data.data.sent_files
                    },
                    deliveredData:{
                        title: response.data.data.title,
                        details: response.data.data.delivered_details,
                        files: response.data.data.delivered_files,
                    },
                    evaluationData: response.data.data.rate?{
                        rate: response.data.data.rate,
                        evaluation: response.data.data.evaluation
                    }:null
                })
            }).catch(error=>{
                console.log(error.response)
                if (error.response.status === 404){
                    this.setState({error: 404});
                }else{
                    this.setState({error: error})
                }
            })
    }
    reviewingStart=()=>{
        this.setState({
            review: true,
        });
    }
    cancelReviewing=()=>{
        this.setState({
            review: false,
        });
    }

    render(){
        let task;
        if (this.state.sentData){
            task = <>
            <div>
                {this.props.error? <span>{this.props.error}</span>: null}
                {this.props.message? <span>{this.props.message}</span>: null}
            </div>
            <div className={classes.DetailsContainer}>
                <TaskDetails {...this.state.sentData} user={this.state.sender_info} created_at={this.state.datesObjects.created_at}  deadline={this.state.datesObjects.deadline}/>
                <TaskDetails {...this.state.deliveredData} user={this.state.receiver_info} delivered_at={ (this.state.status === 'delivered') || (this.state.status === 'accepted') ? this.state.datesObjects.delivered_at:null} deadline={this.state.datesObjects.deadline}/>
            </div>
            {
                this.state.status === "accepted"?
                    <InformationTemplate label="Evaluation" className={classes.Evaluation}>
                        <span className={(this.state.evaluationData.rate>60)?[classes.EvaluationRate, classes.Success].join(' '):(this.state.evaluationData.rate<50)?[classes.EvaluationRate, classes.Failed].join(' '):null}>
                            {this.state.evaluationData.rate}
                        </span>
                        <div dangerouslySetInnerHTML={{__html: this.state.evaluationData.evaluation}} className={classes.EvaluationContent}></div>
                    </InformationTemplate>
                :<></>
            }
            {
                (this.state.sender_info.id === this.props.userID ) && (this.state.status === 'deliver')?
                    <div className={classes.Actions}>
                        <Button type="submit" btnType="Success" clicked={this.reviewingStart}>Accept task</Button>
                        <Button type="submit" btnType="Danger" clicked={()=>this.props.refuseTask(this.state.id)}>Refuse task</Button>
                    </div>
                :(this.state.receiver_info.id === this.props.userID) && (this.state.status === 'pending')?
                    <div className={classes.Actions}>
                        <Link to={{
                            pathname: `/deliver-task/${this.state.id}`,
                            state: {title: this.state.title}
                        }}
                        className={classes.DeliverTask}
                        >
                            Deliver Task
                        </Link>
                    </div>
                :null
            }
            
        </>
        } else if (this.state.error && typeof this.state.error === 'string'){
            task = <p style={{
                color: '#ca0000',
                margin: '20px auto',
                textTransform: 'uppercase'
            }}>{this.state.error}</p>
        } else if (this.state.error && this.state.error === 404){
            return (
                <Redirect to="/404" />
            )
        }
        return (
            <>
                {this.props.loading? <Spinner /> : task}
                {
                    this.state.receiver_info?
                        (this.state.receiver_info.id === this.props.userID) && (this.state.status === 'pending')?
                            <Modal title="Deliver Task" show={this.props.history.location.pathname===`/deliver-task/${this.state.id}`} modalClosed={()=>this.props.history.goBack()}>
                                <DeliverTask taskID={this.state.id} taskTitle={this.state.title}/>
                            </Modal>
                        :null
                    :null
                }
                {
                    this.state.sender_info?
                        (this.state.sender_info.id === this.props.userID) && (this.state.status === 'deliver')?
                            <Modal title="Review Task" show={this.state.review} modalClosed={this.cancelReviewing}>
                                <ReviewTask taskID={this.state.id}/>
                            </Modal>
                        :null
                    :null
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return{
        userID: parseInt(state.login.userID),
        loading: state.tasks?state.tasks.loading:null,
        error: state.tasks?state.tasks.error:null,
        message: state.tasks?state.tasks.message:null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        refuseTask: (taskID)=>dispatch(actions.refuseTask(taskID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)