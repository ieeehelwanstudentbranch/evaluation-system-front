import React, {Component} from "react";
import Input from '../../components/UI/Input/Input';
import classes from './CreateTask.module.scss'
import DragableArea from "../../components/DragableArea/DragableArea";
import Button from '../../components/UI/Button/Button';
import RichEditor from '../../components/RichEditor/RichEditor';

class CreateTask extends Component {
    state = {
        nodes : [
            {
                value: 'ex-com',
                label: 'Ex-com',
                children: [
                    { value: 'chairperson', label: 'Chairperson' },
                    { value: 'vice-chairperson', label: 'Vice Chairperson' },
                ],
            },{
                value: 'high-board',
                label: 'High Board',
                children: [
                    { value: 'it', label: 'IT' },
                    { value: 'ac', label: 'AC' },
                ],
            }
        ],
        TaskForm: {
            title: {
                labelName: null,
                elementConfig: {
                    type: 'text',
                    id: 'taskTitle',
                    name: 'taskTitle',
                    placeholder: 'Task Title',
                },
                value: '',
                validation: {
                    minLength: 3,
                    maxLength: 50,
                    required: true
                },
                valid: false,
                touched: false
            },
            deadline: {
                labelName: null,
                elementConfig: {
                    type: 'datetime-local',
                    id: 'deadline',
                    name: 'deadline',
                    placeholder: 'Deadline',
                },
                value: '',
                validation: {
                    minLength: 3,
                    maxLength: 50,
                    required: true
                },
                valid: false,
                touched: false
            },
            files: [],
            
        },
        checked: [],
        expanded: [],
    }
    
    render(){
        return(
            <>
                <form>
                    <div className={classes.leftSection}>
                        <div className={classes.basicInfo} >
                            <Input elementConfig={this.state.TaskForm.title.elementConfig} />
                            <Input elementConfig={this.state.TaskForm.deadline.elementConfig} />
                        </div>
                        <RichEditor />
                        <DragableArea />
                    </div>
                    <div className={classes.rightSection}>
                        
                    </div>
                    <Button btnType="Default">Send</Button>
                </form>
            </>
        )
    }
}

export default CreateTask