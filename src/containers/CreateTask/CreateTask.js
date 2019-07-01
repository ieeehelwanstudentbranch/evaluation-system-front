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


class CreateTask extends Component {
    state = {
        nodes: [],
        checked: [],
        expanded: [],
        files: []
    }
    componentDidMount(){
        axios.get('/create-task/')
            .then(response=>{
                console.log(response.data.data);
                let ex_com ={
                    value: response.data.data.EX_com.map(member=>{
                        return(
                            member.id !== this.props.userID ? member.id : null
                        )
                    }),
                    label: 'EX_COM',
                    children: response.data.data.EX_com.map(member=>{
                        return {value: member.id, label: `${member.firstName} ${member.lastName}`, disabled:member.id == this.props.userID}
                    })
                }
                let highBoard ={
                    value: response.data.data.highBoard.map(director=>{
                        return(
                            director.id !== this.props.userID ? director.id : null
                        )
                    }),
                    label: 'Directors',
                    children: response.data.data.highBoard.map(director=>{
                        return {value: director.id, label: `${director.firstName} ${director.lastName}`, disabled:director.id == this.props.userID}
                    })
                }
                console.log(ex_com)
                if(ex_com){
                    this.setState({
                        nodes: [...this.state.nodes, ex_com]
                    })
                }
                if(highBoard.children > 0){
                    this.setState({
                        nodes: [...this.state.nodes, highBoard]
                    })
                }
            }).catch(error=>{
                console.log(error)
            })
        ;
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
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
                render={(FormikProps)=>(
                    <Form style={{justifyContent: 'flex-end'}}>
                        <div className={classes.leftSection}>
                            {this.props.error? <span>Sorry something went wrong please try again later</span>: null}
                            {this.props.message? <span>{this.props.message}</span>: null}
                            <div className={classes.basicInfo}>
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
                            <DragableArea />
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
                        <Button type="submit" btnType="Default" disabled={!FormikProps.isValid || FormikProps.isSubmitting}>SEND</Button>
                    </Form>
                )}
            />
        )
    }
}
const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id:null
    }
}
export default connect(mapStateToProps)(CreateTask)