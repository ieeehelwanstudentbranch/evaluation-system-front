import React,{Component} from 'react';
import Task from '../../components/Task/Task';
import classes from './PendingTasks.module.scss';
import axios from '../../axios';

class PendingTasks extends Component{

    state = {
        committee_tasks: null,
        mentoring_tasks: null,
        personal_tasks: null
    }

    componentDidMount(){
        new Promise((resolve, reject) => {
            axios.get('/pending-tasks/')
                .then(response=>{
                    resolve(response.data.data)
                }).catch(error=>{
                    reject(error)
                })
        }).then(response=>{
            console.log(response)
            if (response.committee_tasks){
                this.setState({committee_tasks: response.committee_tasks})
            }
            if (response.mentoring_tasks){
                this.setState({mentoring_tasks: response.mentoring_tasks})
            }
            if (response.personal_tasks){
                this.setState({personal_tasks: response.personal_tasks})
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    render(){
        return (
            <div className={classes.PendingTasks}>
                {
                    this.state.committee_tasks?
                        <section className={classes.TasksGroup}>
                            <h2>Committee Tasks</h2>
                            <div className={classes.Tasks}>
                                {this.state.committee_tasks.map(task=>{
                                    return (
                                        <Task taskDetails={task}/>
                                    )
                                })}
                            </div>
                        </section>:
                    <></>
                }
                {
                    this.state.mentoring_tasks?
                        <section className={classes.TasksGroup}>
                            <h2>Mentoring Tasks</h2>
                            <div className={classes.Tasks}>
                                {this.state.mentoring_tasks[0].map(task=>{
                                    return (
                                        <Task taskDetails={task}/>
                                    )
                                })}
                            </div>
                        </section>:
                    <></>
                }
                {
                    this.state.personal_tasks?
                        <section className={classes.TasksGroup}>
                            <h2>Personal Tasks</h2>
                            <div className={classes.Tasks}>
                                {this.state.personal_tasks.map(task=>{
                                    return (
                                        <Task taskDetails={task}/>
                                    )
                                })}
                            </div>
                        </section>:
                    <></>
                }
            </div>
        )
    }
}

export default PendingTasks;