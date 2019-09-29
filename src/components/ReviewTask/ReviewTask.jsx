import React, {Component} from "react";
import * as classes from './ReviewTask.module.scss';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Button from '../../components/UI/Button/Button';
import RichEditor from '../../components/RichEditor/RichEditor';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class ReviewTask extends Component {

    componentDidMount(){}

    handleSubmit = (values, {props = this.props, setSubmitting }) =>{
        props.submitEvaluation(props.taskID, values.mark, props.evaluationDetails);
        setSubmitting(false);
        return;
    }
    
    render(){
        const validationSchema = Yup.object().shape({
            mark: Yup.number()
                .min(1, "Mark must be at least 1")
                .max(100, 'Max mark must be less than or equal 100')
                .required('Mark is requred and it must be between 1 - 100'),
        });
        const initialValues={
            mark: 0,
        };
        return (
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
                render={(FormikProps)=>(
                    <Form className={classes.TaskForm}>
                        <div className={classes.leftSection}>
                            {this.props.error? <span>Sorry something went wrong please try again later</span>: null}
                            {this.props.message? <span>{this.props.message}</span>: null}
                            <div className={classes.BasicInfo}>
                                <div className={classes.Input}>
                                    <label htmlFor="title" className={classes.Label} >Mark<span className="required">*</span></label>
                                    <Field type="number" id="mark" name="mark" placeholder='Put Mark between 1 - 100' className={classes.InputElement} min={1} max={100}/>
                                    <ErrorMessage name="mark" />
                                </div>
                            </div>
                            <RichEditor place="evaluateTask"/>
                        </div>
                        
                        <Button type="submit" btnType="Default" disabled={FormikProps.isSubmitting || !this.props.evaluationDetails}>SEND</Button>
                    </Form>
                )}
            />
        )
    }
}
const mapStateToProps = state => {
    return{
        userID: state.user.userData?state.user.userData.id:null,
        evaluationDetails: state.evaluateTask.data? state.evaluateTask.data:null,
    }
}
const mapDispatchToProps = dispatch => {
    return{
        submitEvaluation: (id, mark, details)=>dispatch(actions.evaluatingTask(id, mark, details))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewTask)