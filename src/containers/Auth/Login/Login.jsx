import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import * as classes from './Login.module.scss';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom';
class Login extends Component{

    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        props.onLogin(values.loginEmail, values.loginPassword);
        setSubmitting(false);
        return;
    }

    render(){
        const validationSchema = Yup.object().shape({
            loginEmail: Yup.string()
                .trim()
                .required('No Email Provided')
                .email('It doesn\'t seems an valid Email'),
            loginPassword: Yup.string()
                .trim()
                .required('No Password Provided')
                .min(8, 'Password is too short it must be at least 8 characters or longer')
                .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/,'Your password must have numbers, capital letters, small letters and special characters ')
            ,
        });
        const initialValues= {
            loginEmail: '',
            loginPassword: ''
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
                        <Form >
                            {this.props.error? <span>{this.props.error}</span>: null}
                            {this.props.message? <span>{this.props.message}</span>: null}
                            <div className={classes.Input}>
                                <label htmlFor="loginEmail" className={classes.Label} >Email</label>
                                <Field type="email" id="loginEmail" name="loginEmail" placeholder="Email" className={classes.InputElement}/>
                                <ErrorMessage name="loginEmail" />
                            </div>
                            <div className={classes.Input}>
                                <label htmlFor="loginPassword" className={classes.Label} >Password</label>
                                <Field type="password" id="loginPassword" name="loginPassword" placeholder="Password" className={classes.InputElement}/>
                                <ErrorMessage name="loginPassword" />
                            </div>
                            <Button type="submit" btnType="Default" className={classes.LoginButton} disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Login</Button>
                            <p>Didn't have an Account?! <Link
                                href={{pathname: '/registration', query: { mode: 'registration' }}}
                                as={`/`}
                                to="/registration"
                                exact
                                className={classes.CreateAccountLink}
                            >Create an Account</Link></p>
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
        loading: state.login.loading,
        error: state.login.error,
        message: state.login.message,
        isAuthenticated: state.login.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);