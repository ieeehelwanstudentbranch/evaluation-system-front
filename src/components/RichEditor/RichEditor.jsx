import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './RichEditor.module.scss';
import * as actions from '../../store/actions/index';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
class RichEditor extends Component {
    modules = {
        toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
    }
    
    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    render(){
        return(
            <ReactQuill
                className={classes.Editor}
                placeholder= {
                    this.props.place ==='tasks'?
                        "Please, Write the task details it should contain a full clear description of the task that helps volunteer to complete the task and increase the maximum value of volunteering."
                    :this.props.place ==='posts'?
                        "Write your post details, it might contain and image, video, links, etc.."
                    :this.props.place ==='deliverTask'?
                        "Be specific and clear while delivering your task remember everything you will write will be a part of your evaluation."
                    :this.props.place ==='evaluateTask'?
                        "Write a full evaluation to the volunteer that helps volunteer to develop his self and gain maximum value of volunteering."
                    :" write details"
                }
                theme="snow"
                value={this.props.data}
                modules={this.modules}
                formats={this.formats}
                onChange={(value)=>this.props.onChange(value)}
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    switch (props.place) {
        case 'tasks':
            return {
                data: state.tasks.data
            }
        ;
        case 'posts':
            return {
                data: state.posts.data
            }
        ;
        case 'deliverTask':
            return {
                data: state.tasks.data
            }
        ;
        case 'evaluateTask':
            return {
                data: state.evaluateTask.data
            }
        ;
        default:
            break;
    }
}

const mapDispatchToProps = (dispatch, props) => {
    switch (props.place) {
        case 'tasks':
            return {
                onChange: (data)=> dispatch(actions.handleTaskDetails(data))
            }
        ;
        case 'posts':
            return {
                onChange: (data)=> dispatch(actions.handlePostDetails(data))
            }
        ;
        case 'deliverTask':
            return {
                onChange: (data)=> dispatch(actions.handleDeliveringTaskDetails(data))
            }
        ;
        case 'evaluateTask':
            return {
                onChange: (data)=> dispatch(actions.handleEvaluatingTaskDetails(data))
            }
        ;
        default:
            break;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditor);