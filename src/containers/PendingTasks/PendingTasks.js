import React,{Component} from 'react';
import Task from '../../components/Task/Task';
import classes from './PendingTasks.module.scss';

class PendingTasks extends Component{

    render(){
        return (
            <div className={classes.Tasks}>
                <Task />
                <Task />
                <Task />
                <Task />
            </div>
            
        )
    }
}

export default PendingTasks;