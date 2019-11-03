import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';
import * as classes from '../../../assets/scss/Input.module.scss';
import {connect} from 'react-redux';

class ForgetPassword extends Component{

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
            form =  'loading'
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
                            <span>Write the email which you are registered with it to send the reset password code.</span>
                            <div className={classes.Input}>
                                <label htmlFor="targetEmail" className={classes.Label} >Email</label>
                                <Field type="email" id="targetEmail" name="targetEmail" placeholder="example@domain.com" className={classes.InputElement}/>
                                <ErrorMessage name="targetEmail" />
                            </div>
                            <Button type="submit" btnType="Default" className={classes.LoginButton} disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Login</Button>
                        </Form>
                    )}
                />
            </>
        }
        
        
        return(
            <div className={this.props.className}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);