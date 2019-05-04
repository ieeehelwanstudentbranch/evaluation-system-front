import React, {Component} from "react";
import Input from '../UI/Input/Input';
import classes from './CreateTask.module.scss'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DragableArea from "../UI/DragableArea/DragableArea";


class CreateTask extends Component {
    state = {
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
            files: []
        }
    }
    
    
    render(){
        return(
            <>
                <form>
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

                </form>
                

            </>
        )
    }
}

export default CreateTask