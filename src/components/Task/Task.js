import React, {Component} from 'react';
import classes from './Task.module.scss';
import { NavLink } from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import axios from '../../axios';

class Task extends Component {
    state = {
        sender_info: null,
        receiver_info: null,
        committee_info: null
    }

    componentDidMount(){
        if(!this.props.readyComponent){
            // axios.get(`user/${this.props.from}`)
            // .then(response=>{
            //     console.log(response.data.data)
            //     this.setState({sender_info: response.data.data})
            // }).catch(error=>{
            //     console.log(error.response)
            // });
            // setTimeout(()=>{
            //     axios.get(`user/${this.props.to}`)
            //     .then(response=>{
            //         console.log(response.data.data)
            //         this.setState({receiver_info: response.data.data})
            //     }).catch(error=>{
            //         console.log(error.response)
            //     });
            // },1000)
            setTimeout(()=>{
                Promise.all([
                    axios.get(`user/${this.props.from}`),
                    axios.get(`user/${this.props.to}`),
                    axios.get(`committee/${this.props.committee_id}`),
                ]).then((responses)=>{
                    console.log(responses)
                    this.setState({sender_info: responses[0].data.data})
                    this.setState({receiver_info: responses[1].data.data})
                    this.setState({committee_info: responses[2].data.data})
                })
            }, 5000)
            
        }
    }

    render(){
        let deadline = new Date(this.props.deadline);
        let createdTime = new Date(this.props.create_at);
        let deliveredTime = new Date(this.props.deliver_at);
        console.log(this.props)
        return(
            <NavLink className={classes.TaskLink} to={`/task/${this.props.id}`} exact={this.props.exact}>
                <article className={classes.Task}>
                    <h3>{this.props.title.substring(0, 20)}...</h3>
                    {this.props.create_at ? <p>Creating Time: <time dateTime={createdTime}>{createdTime.getDate()}-{createdTime.getMonth()+1}-{createdTime.getFullYear()} at {createdTime.getHours()}:{createdTime.getMinutes()<9?'0'+createdTime.getMinutes():createdTime.getMinutes()}</time></p>: null }
                    {this.props.deadline ? <p>Deadline: <time dateTime={deadline}>{deadline.getDate()}-{deadline.getMonth()+1}-{deadline.getFullYear()} at {deadline.getHours()}:{deadline.getMinutes()<9?'0'+deadline.getMinutes():deadline.getMinutes()}</time></p>: null }
                    {this.props.deliver_at ? <p>Delivering Time: <time dateTime={deliveredTime}>{deliveredTime.getDate()}-{deliveredTime.getMonth()+1}-{deliveredTime.getFullYear()} at {deliveredTime.getHours()}:{deliveredTime.getMinutes()<9?'0'+deliveredTime.getMinutes():deliveredTime.getMinutes()}</time></p>: null }
                    {
                        this.props.sender_info ?
                            <p>Sender Name: <span>{`${this.props.sender_info[0].firstName} ${this.props.sender_info[0].lastName}`}</span></p>
                        : this.state.sender_info ?
                            <p>Sender Name: <span>{`${this.state.sender_info.firstName} ${this.state.sender_info.lastName}`}</span></p>
                        :null
                    }
                    {
                        this.props.receiver_info ?
                            <p>Receiver Name: <span>{`${this.props.receiver_info[0].firstName} ${this.props.receiver_info[0].lastName}`}</span></p>
                        : this.state.receiver_info ?
                            <p>Receiver Name: <span>{`${this.state.receiver_info.firstName} ${this.state.receiver_info.lastName}`}</span></p>
                        :null
                    }
                    {this.props.task_status ? this.props.task_status === 'delivered'?<span className={classes.TaskStatus}><MdCheckCircle/></span>:null:null}
                    {this.props.committee ? this.props.committee.length>0? <p>Committee: <span>{`${this.props.committee[0].name}`}</span></p>:null:null}
                </article>
            </NavLink>
        )
    }
}
export default Task;