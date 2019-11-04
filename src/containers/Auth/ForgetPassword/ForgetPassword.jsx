import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import * as classes from '../../../assets/scss/Input.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class ForgetPassword extends Component{

    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        props.submit(values.targetEmail);
        setSubmitting(false);
        return;
    }

    render(){
        const validationSchema = Yup.object().shape({
            targetEmail: Yup.string()
                .trim()
                .required('No Email Provided')
                .email('It doesn\'t seems an valid Email')
            ,
        });
        const initialValues= {
            targetEmail: '',
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
                            {
                                this.props.message?
                                    <span className="Success">{this.props.message}</span>
                                :this.props.error?
                                    <span className="Failed">{this.props.error}</span>
                                :<span>Write the email which you are registered with it to send the reset password code.</span>
                            }
                            <div className={classes.Input}>
                                <label htmlFor="targetEmail" className={classes.Label} >Email</label>
                                <Field type="email" id="targetEmail" name="targetEmail" placeholder="example@domain.com" className={classes.InputElement}/>
                                <ErrorMessage name="targetEmail" />
                            </div>
                            <Button type="submit" btnType="Default" className={classes.LoginButton} disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Submit</Button>
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
        loading: state.forgetPassword.loading,
        error: state.forgetPassword.error,
        message: state.forgetPassword.message,
        isAuthenticated: state.login.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (email) => dispatch(actions.forgetPassword(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);