import React, { Component } from 'react';
import * as classes from './SingleTask.module.scss';
import axios from '../../axios';
import {connect} from 'react-redux';
import InformationHeader from '../../components/UI/InformationHeader/InformationHeader';
import { MdFileDownload } from "react-icons/md";
import InformationTemplate from '../../components/UI/InformationTemplate/InformationTemplate';
// import Button from '../../components/UI/Button/Button';
import {Link} from 'react-router-dom';

class SingleTask extends Component{
    state={
        id: null,
        // sent details
        title: null,
        details: null,
        files: null,
        deadline: null,
        created_at: null,
        sender_info: null,
        receiver_info: null,
        // deliverd details
        delivered_details: null,
        delivered_files: null,
        delivered_at: null
    }
    componentDidMount(){
        axios.get(`${this.props.location.pathname}`)
            .then(response=>{
                console.log(response.data.data)
                this.setState({
                    id: this.props.match.params.id,
                    title: response.data.data.title,
                    details: response.data.data.details,
                    files: response.data.data.sent_files?response.data.data.sent_files:null,
                    deadline: response.data.data.deadline,
                    created_at: response.data.data.created_at.date,
                    sender_info: response.data.data.sender_info[0],
                    delivered_files: response.data.data.delivered_files?response.data.data.delivered_files:null,
                    delivered_details: response.data.data.delivered_details?response.data.data.delivered_details:null,
                    receiver_info: response.data.data.receiver_info? response.data.data.receiver_info[0]: null,
                })
            }).catch(error=>{
                console.log(error)
            })
    }
    render(){

        let deadline = new Date(this.state.deadline),
            creating_time = new Date(this.state.created_at),
            delivered_at = new Date(this.state.delivered_at);
        let task= <> </>;
        if (this.state.title){
            task = <div className={classes.SinglePost}>
                {
                    this.state.sender_info ?
                        <InformationHeader {...this.state.sender_info} created_at={this.state.created_at}/>
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
                                this.state.deadline ?
                                    <p>Creating Time: <time dateTime={creating_time}>{creating_time.getDate()}-{creating_time.getMonth()+1}-{creating_time.getFullYear()} at {creating_time.getHours()}:{creating_time.getMinutes()<9?'0'+creating_time.getMinutes():creating_time.getMinutes()}</time></p>
                                : null
                            }
                            {
                                this.state.deadline ?
                                    <p>Deadline: <time dateTime={deadline}>{deadline.getDate()}-{deadline.getMonth()+1}-{deadline.getFullYear()} at {deadline.getHours()}:{deadline.getMinutes()<9?'0'+deadline.getMinutes():deadline.getMinutes()}</time></p>
                                : null
                            }
                            {
                                this.state.delivered_at ?
                                    <p>Deleved at: <time dateTime={delivered_at}>{delivered_at.getDate()}-{delivered_at.getMonth()+1}-{delivered_at.getFullYear()} at {delivered_at.getHours()}:{delivered_at.getMinutes()<9?'0'+delivered_at.getMinutes():delivered_at.getMinutes()}</time></p>
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
                    this.state.files?
                        <InformationTemplate label="task files">
                            <ul className={classes.Files}>
                                {
                                    this.state.files.map((file,index)=>(
                                        <li key={index}>{file}<a href={`http://localhost:8000/storage/tasks_sent/${file}`} download={true}><MdFileDownload /></a></li>
                                    ))
                                }
                            </ul>
                        </InformationTemplate>
                    :null
                }
                {
                    this.state.receiver_info.id === this.props.userID ?
                    // to={`/deliver-task/${this.state.id}`}
                        <Link to={{
                                pathname: `/deliver-task/${this.state.id}`,
                                state: {title: this.state.title}
                            }}
                            className={classes.DeliverTask}
                        >
                            Deliver Task
                        </Link>
                    :<p>You are not authorized to deliver task</p>
                }
            </div>
        }
        return (
            task
        )
    }
}

const mapStateToProps = state => {
    return{
        userID: parseInt(state.login.userID)
    }
}
export default connect(mapStateToProps, null)(SingleTask)