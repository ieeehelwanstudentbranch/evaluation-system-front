import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Redirect} from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import InputClasses from '../../../components/UI/Input/Input.module.scss';
import classes from './Registration.module.scss';

class Registration extends Component{
    render(){
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
            password: Yup.string()
                .trim()
                .required('No Password Provided')
                .min(8, 'Password is too short it must be at least 8 characters or longer')
                .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/,'Your password must contains numbers, capital letters, small letters and special characters '),
            password_confirmation: Yup.string()
                .trim()
                .required('No Password Provided')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            DOB: Yup.date(),
            position: Yup.string()
                .required('Please select your position'),
            ex_options: Yup.string()
                .when('position',{
                    is: 'EX_com',
                    then: Yup.string()
                        .required('You must choose your position'),
                    otherwise: Yup.string().notRequired()
                }),
            committee: Yup.string()
                .when('position',{
                    is: 'EX_com',
                    then: Yup.string().notRequired(),
                    otherwise: Yup.string().required('Please choose your new Family')
                })
            ,
            faculty: Yup.string().trim(),
            university: Yup.string().trim(),
        });
        const initialValues= {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password_confirmation: '',
            DOB: '',
            position: '',
            ex_options: '',
            committee: '',
            faculty: '',
            university: ''
        }
        let form;
        if (this.props.loading){
            form =  <Spinner />
        } else {
            form = <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                    render={(FormikProps)=>(
                        <Form className={classes.Form}>
                            {this.props.error? <span>Sorry something went wrong please try again later</span>: null}
                            {this.props.message? <span>{this.props.message}</span>: null}
                            <div className={classes.LeftSection}>
                                <div className={classes.Row}>
                                    <div className={InputClasses.Input}>
                                        <Field type="text" id="firstName" name="firstName" placeholder="First Name" className={InputClasses.InputElement}/>
                                        <ErrorMessage name="firstName" />
                                    </div>
                                    <div className={InputClasses.Input}>
                                        <Field type="text" id="lastName" name="lastName" placeholder="Last Name" className={InputClasses.InputElement}/>
                                        <ErrorMessage name="lastName" />
                                    </div>
                                </div>
                                <div className={InputClasses.Input}>
                                    <Field type="email" id="email" name="email" placeholder="Email" className={InputClasses.InputElement}/>
                                    <ErrorMessage name="email" />
                                </div>
                                <div className={InputClasses.Input}>
                                    <Field type="password" id="password" name="password" placeholder="Password" className={InputClasses.InputElement}/>
                                    <ErrorMessage name="password" />
                                </div>
                                <div className={InputClasses.Input}>
                                    <Field type="password" id="password_confirmation" name="password_confirmation" placeholder="password Confirmation" className={InputClasses.InputElement}/>
                                    <ErrorMessage name="password_confirmation" />
                                </div>
                                <div className={InputClasses.Input}>
                                    <Field type="date" id="dob" name="DOB" placeholder="Date Of Birth" className={InputClasses.InputElement}/>
                                    <ErrorMessage name="DOB" />
                                </div>
                            </div>
                            <div className={classes.RightSection}>
                                <div className={InputClasses.Input}>
                                    <Field component="select" id="position" name="position" className={InputClasses.InputElement}>
                                        <option value="">Select Your Position</option>
                                        <option value="EX_com">Ex-com</option>
                                        <option value="highBoard">High Board</option>
                                        <option value="volunteer">Volunteer</option>
                                    </Field>
                                    <ErrorMessage name="position"/>
                                </div>
                                {FormikProps.values.position === 'EX_com' ? 
                                    <div className={InputClasses.Input}>
                                        <Field component="select" id="ex_options" name="ex_options" className={InputClasses.InputElement} placeholder="Your Position">
                                            <option value="">Select Your Role</option>
                                            <option value="chairperson">Chairperson</option>
                                            <option value="vice_chairperson">Vice Chairperson</option>
                                            <option value="treasurer">Treasurer</option>
                                            <option value="secretary">Secretary</option>
                                            <option value="chairperson_ras">Chairperson RAS</option>
                                            <option value="chairperson_pes">Chairperson PES</option>
                                            <option value="chairperson_wie">Chairperson WIE</option>
                                        </Field>
                                        <ErrorMessage name="ex_options" />
                                    </div>:
                                    null
                                }
                                {FormikProps.values.position !== 'EX_com' && FormikProps.values.position !== '' ? 
                                    <div className={InputClasses.Input}>
                                        <Field component="select" id="committee" name="committee" className={InputClasses.InputElement}>
                                            <option value="">Select Comittee</option>
                                            <option value="it">IT</option>
                                        </Field>
                                        <ErrorMessage name="committee" />
                                    </div> :
                                    null
                                }
                                <div className={InputClasses.Input}>
                                    <Field type="faculty" id="faculty" name="faculty" placeholder="Faculty" className={InputClasses.InputElement}/>
                                    <ErrorMessage name="faculty" />
                                </div>
                                <div className={InputClasses.Input}>
                                    <Field type="university" id="university" name="university" placeholder="University" className={InputClasses.InputElement}/>
                                    <ErrorMessage name="university" />
                                </div>
                                <Button type="submit" btnType="Default" disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Submit</Button>
                            </div>
                        </Form>
                    )}
                />
            </>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />
        }
        return(
            <div>
                {authRedirect}
                {form}
                
            </div>
        );
    }
}


export default Registration;
