import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import * as InputClasses from '../../../assets/scss/Input.module.scss';
import * as classes from './ResetPassword.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class ResetPassword extends Component{

    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        let confirmationCode = this.props.match.params.code.trim();
        props.submit(confirmationCode, values.newPassword);
        setSubmitting(false);
        return;
    }

    render(){
        const validationSchema = Yup.object().shape({
            newPassword: Yup.string()
                .trim()
                .required('No Password Provided')
                .min(8, 'Password is too short it must be at least 8 characters or longer')
                .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/,'Your password must contains numbers, capital letters, small letters and special characters '),
            NewPasswordConfirmation: Yup.string()
                .trim()
                .required('No Password Provided')
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        });
        const initialValues= {
            newPassword: '',
            NewPasswordConfirmation: ''
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
                            {
                                this.props.message?
                                    <span className="Success">{this.props.message}</span>
                                :this.props.error?
                                    <span className="Failed">{this.props.error}</span>
                                :<span>Write the new password.</span>
                            }
                            <div className={InputClasses.Input}>
                                <label htmlFor="newPassword" className={InputClasses.Label} >New Password</label>
                                <Field type="password" id="newPassword" name="newPassword" placeholder="New Password" className={InputClasses.InputElement}/>
                                <ErrorMessage name="newPassword" />
                            </div>
                            <div className={InputClasses.Input}>
                                <label htmlFor="NewPasswordConfirmation" className={InputClasses.Label} >New Password Confirmation</label>
                                <Field type="password" id="NewPasswordConfirmation" name="NewPasswordConfirmation" placeholder="Re-Password" className={InputClasses.InputElement}/>
                                <ErrorMessage name="NewPasswordConfirmation" />
                            </div>
                            <Button type="submit" btnType="Default" className={InputClasses.LoginButton} disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Submit</Button>
                        </Form>
                    )}
                />
            </>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to="/home" />
        }

        return(
            <div className={this.props.className}>
                {authRedirect}
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.resetPassword.loading,
        error: state.resetPassword.error,
        message: state.resetPassword.message,
        isAuthenticated: state.login.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (resetCode, newPassword) => dispatch(actions.resetPassword(resetCode, newPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);