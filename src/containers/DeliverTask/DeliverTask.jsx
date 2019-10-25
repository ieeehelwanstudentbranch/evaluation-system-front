import React, {Component} from "react";
import classes from './DeliverTask.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';

import InputClasses from '../../assets/scss/Input.module.scss';
import DragableArea from "../../components/DragableArea/DragableArea";
import Button from '../../components/UI/Button/Button';
import RichEditor from '../../components/RichEditor/RichEditor';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class CreateTask extends Component {

    handleSubmit = (values, {props = this.props, setSubmitting }) =>{
        props.submitTask(props.taskID, props.taskDetails, props.taskFiles);
        setSubmitting(false);
        return;
    }
    
    render(){
        const initialValues={
            title: this.props.taskTitle || '',
        };
        return (
            this.props.loading?
                <Spinner />
            :<Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                render={(FormikProps)=>(
                    <Form className={classes.TaskForm}>
                        <div className={classes.leftSection}>
                            {this.props.error? <span>{this.props.error}</span>: null}
                            {this.props.message? <span>{this.props.message}</span>: null}
                            <div className={classes.BasicInfo}>
                                <div className={InputClasses.Input}>
                                    <label htmlFor="title" className={InputClasses.Label} >Task Title<span className="required">*</span></label>
                                    <Field type="text" id="title" name="title" className={InputClasses.InputElement} disabled/>
                                    <ErrorMessage name="title" />
                                </div>
                            </div>
                            <RichEditor place="deliverTask"/>
                            <DragableArea />
                        </div>
                        
                        <Button type="submit" btnType="Default" disabled={FormikProps.isSubmitting || !this.props.taskDetails}>SEND</Button>
                    </Form>
                )}
            />
        )
    }
}
const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id:null,

        loading: state.tasks?state.tasks.loading:null,
        error: state.tasks?state.tasks.error:null,
        message: state.tasks?state.tasks.message:null,

        taskDetails: state.tasks.data? state.tasks.data:null,
        taskFiles: state.tasks.files? state.tasks.files: null
    }
}
const mapDispatchToProps = dispatch => {
    return{
        submitTask: (id, details, files)=>dispatch(actions.deliverTask(id, details, files))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)