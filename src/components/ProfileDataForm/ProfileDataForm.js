import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import InputClasses from '../UI/Input/Input.module.scss';
import * as classes from './ProfileDataForm.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
class CommitteForm extends Component {
    state ={
        initialValues: this.props.initialValues
    }

    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        props.onRegister(values.firstName, values.lastName,values.email, values.DOB, values.faculty, values.university);
        setSubmitting(false);
        return;
    }
    
    render(){
        // reg from stack overflow: https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup
        const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
        // Validation Schema;
        const validationSchema = Yup.object().shape({
            firstName: Yup.string()
                .trim()
                .min(2, "First Name must be at least 2 characters or longer")
                .max(20, 'First Name is too long it must be less than or equal 20 characters')
                .required('First Name is Required'),
            lastName: Yup.string()
                .trim()
                .min(2, "Last Name must be at least 2 characters or longer")
                .max(20, 'Last Name is too long it must be less than or equal 20 characters')
                .required('Last Name is Required'),
            email: Yup.string()
                .trim()
                .required('No Email Provided')
                .email('It doesn\'t seems an valid Email'),
            DOB: Yup
                .date()
                .nullable(),
            level: Yup
                .number()
                .nullable(),
            faculty: Yup
                .string()
                .nullable()
                .trim()
                .min(8, "Your Faculty is very short it must be at least 3 characters or more")
                .max(15, "Your Faculty is too long it must be less than or equal 30 characters"),
            university: Yup
                .string()
                .nullable()
                .trim()
                .min(8, "Your University is very short it must be at least 3 characters or more")
                .max(15, "Your University is too long it must be less than or equal 30 characters"),
            phone: Yup
                .string()
                .nullable()
                .min(8, "Your Phone Number is very short it must be at least 8 characters or more")
                .max(15, "Your Phone Number is too long it must be less than or equal 15 characters") 
                .matches(phoneRegExp, 'Phone number is not valid'),
            address: Yup
                .string()
                .nullable()
                .min(3, "The Address is very short it must be at least 3 characters or more")
                .max(50, "The Address is too long it must be less than or equal 50 characters")
            ,
        });

        const initialValues=this.state.initialValues
        console.log(this.state.initialValues)
        
        return (
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}

                render={(FormikProps)=>(
                    <Form className={classes.Form}>
                        {this.props.error? <span>Sorry something went wrong please try again later</span>: null}
                        {this.props.message? <span>{this.props.message}</span>: null}
                        <div className={classes.LeftSection}>
                            <div className={InputClasses.Input}>
                                <Field type="text" id="firstName" name="firstName" placeholder="First Name" className={InputClasses.InputElement}/>
                                <ErrorMessage name="firstName" />
                            </div>
                            <div className={InputClasses.Input}>
                                <Field type="text" id="lastName" name="lastName" placeholder="Last Name" className={InputClasses.InputElement}/>
                                <ErrorMessage name="lastName" />
                            </div>
                            <div className={InputClasses.Input}>
                                <Field type="email" id="email" name="email" placeholder="Email" className={InputClasses.InputElement}/>
                                <ErrorMessage name="email" />
                            </div>
                            <div className={InputClasses.Input}>
                                <Field type="date" id="dob" name="DOB" placeholder="Date Of Birth" className={InputClasses.InputElement}/>
                                <ErrorMessage name="DOB" />
                            </div>
                        </div>
                        <div className={classes.RightSection}>
                            <div className={InputClasses.Input}>
                                <Field type="text" id="level" name="level" placeholder="level" className={InputClasses.InputElement}/>
                                <ErrorMessage name="level" />
                            </div>
                            <div className={InputClasses.Input}>
                                <Field type="text" id="faculty" name="faculty" placeholder="Faculty" className={InputClasses.InputElement}/>
                                <ErrorMessage name="faculty" />
                            </div>
                            <div className={InputClasses.Input}>
                                <Field type="text" id="university" name="university" placeholder="University" className={InputClasses.InputElement}/>
                                <ErrorMessage name="university" />
                            </div>
                            <div className={InputClasses.Input}>
                                <Field type="tel" id="phone" name="phone" placeholder="Phone Number" className={InputClasses.InputElement}/>
                                <ErrorMessage name="phone" />
                            </div>
                        </div>
                        <div className={classes.Row}>
                            <div className={InputClasses.Input}>
                                <Field type="text" id="address" name="address" placeholder="Address" className={InputClasses.InputElement}/>
                                <ErrorMessage name="address" />
                            </div>
                        </div>
                    </Form>
                )}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.user.error?state.user.error:null,
        loading: state.user.loading?state.user.loading:null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, null)(CommitteForm);