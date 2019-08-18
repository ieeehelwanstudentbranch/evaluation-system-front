import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import * as classes from './Login.module.scss';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Redirect } from 'react-router-dom';
import Logo from '../../../components/Logo/ColoredLogo'
class Login extends Component{

    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        props.onLogin(values.email, values.password);
        setSubmitting(false);
        return;
    }

    render(){
        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .trim()
                .required('No Email Provided')
                .email('It doesn\'t seems an valid Email'),
            password: Yup.string()
                .trim()
                .required('No Password Provided')
                .min(8, 'Password is too short it must be at least 8 characters or longer')
                .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/,'Your password must have numbers, capital letters, small letters and special characters ')
            ,
        });
        const initialValues= {
            email: '',
            password: ''
        }
        let form;
        if (this.props.loading){
            form =  <Spinner />
        } else {
            form = <>
                <Logo className={classes.LoginLogo}/>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                    render={(FormikProps)=>(
                        <Form >
                            {this.props.error? <span>Sorry something went wrong please try again later</span>: null}
                            {this.props.message? <span>{this.props.message}</span>: null}
                            <div className={classes.Input}>
                                <label htmlFor="email" className={classes.Label} >Email</label>
                                <Field type="email" id="email" name="email" placeholder="Email" className={classes.InputElement}/>
                                <ErrorMessage name="email" />
                            </div>
                            <div className={classes.Input}>
                                <label htmlFor="password" className={classes.Label} >Password</label>
                                <Field type="password" id="password" name="password" placeholder="Password" className={classes.InputElement}/>
                                <ErrorMessage name="password" />
                            </div>
                            <Button type="submit" btnType="Default" className={classes.LoginButton} disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Login</Button>
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