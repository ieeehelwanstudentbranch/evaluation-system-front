import React, {Component} from "react";
import Input from '../../components/UI/Input/Input';
import classes from './CreateTask.module.scss'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DragableArea from "../../components/UI/DragableArea/DragableArea";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Button from '../../components/UI/Button/Button';

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
        const { selectedOption } = this.state;
        return(
            <>
                <form>
                    <div className={classes.leftSection}>
                        <div className={classes.basicInfo} >
                            <Input elementConfig={this.state.TaskForm.title.elementConfig} />
                            <Input elementConfig={this.state.TaskForm.deadline.elementConfig} />
                        </div>
                        
                        <CKEditor
                            editor={ ClassicEditor }
                            data="<p>write your task details</p>"
                            config={{
                                toolbar: ['Heading', 'Link', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote' ],
                                // ckfinder:{uploadUrl: "/uplaodImageFromEditor"}
                            }}
                            onInit={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                console.log( { event, editor, data } );
                            } }
                            onBlur={ editor => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ editor => {
                                console.log( 'Focus.', editor );
                            } }
                        />
                        <DragableArea />
                    </div>
                    <div className={classes.rightSection}>
                        <CheckboxTree
                            nodes={this.state.nodes}
                            checked={this.state.checked}
                            expanded={this.state.expanded}
                            onCheck={checked => this.setState({ checked })}
                            onExpand={expanded => this.setState({ expanded })}
                        />
                    </div>
                    <Button btnType="Default">Send</Button>
                </form>
            </>
        )
    }
}

export default CreateTask