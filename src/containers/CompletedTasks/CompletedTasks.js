import React,{Component} from 'react';
import Task from '../../components/Task/Task';
import classes from './CompletedTasks.module.scss';

class CompletedTasks extends Component{

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

export default CompletedTasks;