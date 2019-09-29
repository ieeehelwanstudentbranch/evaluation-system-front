import React, {Component} from "react";
import classes from './CreateTask.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import InputClasses from '../../components/UI/Input/Input.module.scss';
import DragableArea from "../../components/DragableArea/DragableArea";
import Button from '../../components/UI/Button/Button';
import RichEditor from '../../components/RichEditor/RichEditor';
import axios from '../../axios';
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdChevronRight,
    MdKeyboardArrowDown,
    MdAddBox,
    MdIndeterminateCheckBox,
    MdFolder,
    MdFolderOpen,
    MdInsertDriveFile
} from "react-icons/md";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class CreateTask extends Component {
    state = {
        nodes: [],
        checked: [],
        expanded: [],
        files: [],
        error: null
    }

    componentDidMount(){
        new Promise((resolve, reject) => {
            axios.get('/create-task/')
                .then(response=>{
                    resolve(response.data.data)
                }).catch(error=>{
                    reject(error)
                })
        }).then(response=>{
            let ex_com = {
                value: response.EX_com.map(member=>{
                    return(
                        member.id !== this.props.userID ? member.id : null
                    )
                }),
                label: 'EX_COM',    
                children: response.EX_com.map(member=>{
                    return {
                        value: member.id,
                        label: `${member.firstName} ${member.lastName}`,
                        disabled:member.id === this.props.userID
                    }
                })
            }
            if(ex_com){
                this.setState({
                    nodes: [...this.state.nodes, ex_com]
                })
            }
            let highBoard ;
            if(response.highBoard){
                let highBoardArray = Object.keys(response.highBoard).map((key)=> {
                    return response.highBoard[key];
                });
                highBoard = {
                    value: highBoardArray.map(director=>{
                        return director.id !== this.props.userID ? director.id : null
                    }),
                    label: 'Directors',
                    children: highBoardArray.map(director=>(
                        {
                            value: director.id,
                            label: `${director.firstName} ${director.lastName}`,
                            disabled: director.id === this.props.userID
                        }
                    ))
                }
            }
            if(highBoard){
                this.setState({
                    nodes: [...this.state.nodes, highBoard]
                })
            }
            let committees = response.committee.filter((committee)=>{
                return committee.volunteers.length>0
            }).map(committee=>{
                return {
                    value: committee.volunteers.map((volunteer)=>{
                        return volunteer.id
                    }),
                    label: committee.name,
                    children: committee.volunteers.map((volunteer)=>{
                        return {
                            value: volunteer.id,
                            label: `${volunteer.name}`,
                            disabled: volunteer.id === this.props.userID
                        }
                    })
                }
            })
            if(committees){
                committees.filter((committee)=>{
                    return committee !== undefined 
                }).map(committee=>{
                    return this.setState({
                        nodes: [...this.state.nodes, committee]
                    })
                })
            }
        ;
        }).catch(error=>{
            this.setState({error: error})
        })
    }

    handleSubmit = (values, {props = this.props, setSubmitting }) =>{
        this.props.submitTask(values.title, values.deadline, props.taskDetails, props.taskFiles, this.state.checked);
        setSubmitting(false);
        return;
    }
    
    render(){
        const icons = {
            check: <MdCheckBox className="rct-icon rct-icon-check" />,
            uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
            halfCheck: (
              <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
            ),
            expandClose: (
              <MdChevronRight className="rct-icon rct-icon-expand-close" />
            ),
            expandOpen: (
              <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
            ),
            expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
            collapseAll: (
              <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
            ),
            parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
            parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
            leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
        };
        const validationSchema = Yup.object().shape({
            title: Yup.string()
                .trim()
                .required('Task title is a Required field')
                .min(3, 'Task title is too short it must be at least 3 characters or longer'),
            deadline: Yup.string()
                .required('Please select the Committee mentor'),
        });
        const initialValues={
            title: '',
            deadline: ''
        };
        return (
            <>
                {
                    this.props.loading === true?
                        <Spinner />
                    :
                    this.props.role === 'EX_com' || this.props.role === 'highBoard' ?

                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={this.handleSubmit}
                        render={(FormikProps)=>(
                            <Form className={classes.TaskForm}>
                                {
                                    this.props.error? 
                                        (typeof this.props.error === "object")?
                                            <ul>
                                                {
                                                    this.props.error.map((err,index)=>{
                                                        return <li style={{listStyleType: 'none', color: '#ca0000'}} key={index}>{err}</li>
                                                    })
                                                }
                                            </ul>
                                        :<p style={{textTransform: 'capitalize', margin: '20px auto', color: "#ca0000"}}>
                                            {this.props.error}
                                        </p>
                                    :null
                                }
                                {this.props.message? <p style={{textTransform: 'capitalize', margin: '20px auto', color: "#8bc24c"}}>{this.props.message}</p>: null}
                                <div className={classes.TaskFormContainer}>
                                    <div className={classes.leftSection}>
                                        <div className={classes.BasicInfo}>
                                            <div className={InputClasses.Input}>
                                                <label htmlFor="title" className={InputClasses.Label} >Task Title<span className="required">*</span></label>
                                                <Field type="text" id="title" name="title" className={InputClasses.InputElement}/>
                                                <ErrorMessage name="title" />
                                            </div>
                                            <div className={InputClasses.Input}>
                                                <label htmlFor="deadline" className={InputClasses.Label} >Deadline<span className="required">*</span></label>
                                                <Field type="datetime-local" id="deadline" name="deadline" className={InputClasses.InputElement}/>
                                                <ErrorMessage name="deadline" />
                                            </div>
                                        </div>
                                        <RichEditor place="tasks"/>
                                        <DragableArea files={this.props.taskFiles}/>
                                    </div>
                                    <div className={classes.rightSection}>
                                        <CheckboxTree
                                            nodes={this.state.nodes}
                                            checked={this.state.checked}
                                            expanded={this.state.expanded}
                                            onCheck={checked => this.setState({ checked })}
                                            onExpand={expanded => this.setState({ expanded })}
                                            icons={icons}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" btnType="Default" className={classes.SubmitButton} disabled={!FormikProps.isValid || FormikProps.isSubmitting || !this.props.taskDetails || this.state.checked.length <= 0 }>SEND</Button>
                            </Form>
                        )}
                    />
                    :<p>You are not authoriezed to access this page</p>
                }
            </>   
        )
    }
}
const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id : null,
        taskDetails: state.tasks.data? state.tasks.data : null,
        taskFiles: state.tasks.files? state.tasks.files : null,
        role: state.user.userData? state.user.userData.position : null,
        message: state.tasks.message? state.tasks.message : null,
        loading: state.tasks.loading? state.tasks.loading : null,
        error: state.tasks.error? state.tasks.error : null,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        submitTask: (title, deadline, details, files, receptors)=>dispatch(actions.sendTask(title, deadline, details, files, receptors))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)