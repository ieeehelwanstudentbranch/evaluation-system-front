import React, { Component } from 'react';
import * as classes from './SingleTask.module.scss';
import axios from '../../axios';
import {connect} from 'react-redux';
import InformationHeader from '../../components/UI/InformationHeader/InformationHeader';
import { MdFileDownload } from "react-icons/md";
import InformationTemplate from '../../components/UI/InformationTemplate/InformationTemplate';
import Button from '../../components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import Modal from '../../components/UI/Modal/Modal';
import ReviewTask from '../../components/ReviewTask/ReviewTask';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import DeliverTask from '../DeliverTask/DeliverTask';
import {endpoint} from '../../utilize/endpoint';

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
                    ...response.data.data
                })
            }).catch(error=>{
                console.log(error.response)
                if (error.response.status === 404){
                    this.setState({error: 404});
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
        let deadline = new Date(this.state.deadline),
            creating_time = this.state.created_at? new Date(this.state.created_at.date):null,
            delivered_at = this.state.delivered_at? new Date(this.state.delivered_at.date):null;
        let task;
        if (this.state.title){
            task = <>
            <div>
                {this.props.error? <span>{this.props.error}</span>: null}
                {this.props.message? <span>{this.props.message}</span>: null}
            </div>
            <div className={classes.DetailsContainer}>
                <div className={classes.TaskDetails}>
                    {
                        this.state.sender_info ?
                            <InformationHeader {...this.state.sender_info[0]} created_at={this.state.created_at.date}/>
                        :null
                    }
                    {
                        this.state.title?
                            <InformationTemplate label="Task info">
                                {
                                    this.state.title ?
                                        <h2>{this.state.title}</h2>
                                    : null
                                }
                                {
                                    this.state.created_at ?
                                        <p>Creating Time: <time dateTime={creating_time}>{creating_time.getDate()}-{creating_time.getMonth()+1}-{creating_time.getFullYear()} at {creating_time.getHours()}:{creating_time.getMinutes()<9?'0'+creating_time.getMinutes():creating_time.getMinutes()}</time></p>
                                    : null
                                }
                                {
                                    this.state.deadline ?
                                        <p>Deadline: <time dateTime={deadline}>{deadline.getDate()}-{deadline.getMonth()+1}-{deadline.getFullYear()} at {deadline.getHours()}:{deadline.getMinutes()<9?'0'+deadline.getMinutes():deadline.getMinutes()}</time></p>
                                    : null
                                }
                            </InformationTemplate>
                        :null
                    }
                    {
                        this.state.details?
                            <InformationTemplate label="Task Details">
                                <article dangerouslySetInnerHTML = {{__html: this.state.details}}></article>
                            </InformationTemplate>
                        :null
                    }
                    {
                        this.state.sent_files?
                            <InformationTemplate label="task files">
                                <ul className={classes.Files}>
                                    {
                                        this.state.sent_files.map((file,index)=>(
                                            <li key={index}>{file}<a href={`${endpoint}/storage/tasks_sent/${file}`} download={true}><MdFileDownload /></a></li>
                                        ))
                                    }
                                </ul>
                            </InformationTemplate>
                        :null
                    }
                </div>
                <div className={classes.TaskDetails}>
                    {
                        this.state.receiver_info ?
                            <InformationHeader {...this.state.receiver_info[0]} created_at={this.state.delivered_details?this.state.delivered_at.date:null}/>
                        :null
                    }
                    {
                        this.state.delivered_details?
                            <InformationTemplate label="delivering info">
                                {
                                    this.state.delivered_details ?
                                        <p>Delivered in: <time dateTime={delivered_at}>{delivered_at.getDate()}-{delivered_at.getMonth()+1}-{delivered_at.getFullYear()} at {delivered_at.getHours()}:{delivered_at.getMinutes()<9?'0'+delivered_at.getMinutes():delivered_at.getMinutes()}</time></p>
                                    : null
                                }
                                
                            </InformationTemplate>
                        :null
                    }
                    {
                        this.state.delivered_details?
                            <InformationTemplate label="Task Details">
                                <article dangerouslySetInnerHTML = {{__html: this.state.delivered_details}}></article>
                            </InformationTemplate>
                        :<InformationTemplate label="Task Details">
                            <p>Task not Delivered yet.</p>
                        </InformationTemplate>
                    }
                    {
                        this.state.delivered_files?
                            <InformationTemplate label="Delivered details">
                                <ul className={classes.Files}>
                                    {
                                        this.state.delivered_files.map((file,index)=>(
                                            <li key={index}>{file}<a href={`${endpoint}/storage/tasks_delivered/${file}`} download={true}><MdFileDownload /></a></li>
                                        ))
                                    }
                                </ul>
                            </InformationTemplate>
                        :<InformationTemplate label="Delivered files">
                            <p>No files Delivered yet.</p>
                        </InformationTemplate>
                    }
                </div>
            </div>
            {
                this.state.status === "accepted"?
                    <InformationTemplate label="Evaluation" className={classes.Evaluation}>
                        <span className={(this.state.rate>60)?[classes.EvaluationRate, classes.Success].join(' '):(this.state.rate<50)?[classes.EvaluationRate, classes.Failed].join(' '):null}>
                            {this.state.rate}
                        </span>
                        <div dangerouslySetInnerHTML={{__html: this.state.evaluation}} className={classes.EvaluationContent}></div>
                    </InformationTemplate>
                :<></>
            }
            {
                (this.state.sender_info[0].id === this.props.userID ) && (this.state.status === 'deliver')?
                    <div className={classes.Actions}>
                        <Button type="submit" btnType="Success" clicked={this.reviewingStart}>Accept task</Button>
                        <Button type="submit" btnType="Danger" clicked={()=>this.props.refuseTask(this.state.id)}>Refuse task</Button>
                    </div>
                :(this.state.receiver_info[0].id === this.props.userID) && (this.state.status === 'pending')?
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
                        (this.state.receiver_info[0].id === this.props.userID) && (this.state.status === 'pending')?
                            <Modal title="Deliver Task" show={this.props.history.location.pathname===`/deliver-task/${this.state.id}`} modalClosed={()=>this.props.history.goBack()}>
                                <DeliverTask taskID={this.state.id} taskTitle={this.state.title}/>
                            </Modal>
                        :null
                    :null
                }
                {
                    this.state.sender_info?
                        (this.state.sender_info[0].id === this.props.userID) && (this.state.status === 'deliver')?
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