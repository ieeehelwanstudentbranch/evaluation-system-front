import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../components/UI/Button/Button';

import classes from '../../../components/UI/Input/Input.module.scss';
import * as actions from '../../../store/actions/index';

class Login extends Component{

    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        props.onLogin(values.email, values.password, values.remember_me);
        setSubmitting(false);
        return;
    }

    render(){
        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .trim()
                .required('No Email Provided')
                .email('It doesn\'t seems an valid Email'),
                // .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'It doesn\'t seems an valid Email Address'),
            password: Yup.string()
                .trim()
                .required('No Password Provided')
                .min(8, 'Password is too short it must be at least 8 characters or longer')
                .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/,'Your password must have numbers, capital letters, small letters and special characters '),
            remember_me: Yup.boolean()
        });
        const initialValues= {
            email: '',
            password: '',
            remember_me: false
        }
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
                render={(FormikProps)=>(
                    <Form >
                        <div className={classes.Input}>
                            <label htmlFor="email" className={classes.Label} >Email</label>
                            <Field type="email" id="email" name="email" placeholder="Email" className={classes.InputElement}/>
                            <ErrorMessage name="email" />
                        </div>
                        <div className={classes.Input}>
                            <label htmlFor="password" className={classes.Label} >Email</label>
                            <Field type="password" id="password" name="password" placeholder="Password" className={classes.InputElement}/>
                            <ErrorMessage name="password" />
                        </div>
                        <div className={classes.Input}>    
                            <label htmlFor="remember_me" className={classes.Label}>
                                <Field type="checkbox" id="remember_me" name="remember_me" />
                                Keep me loged in
                            </label>
                        </div>
                        <Button type="submit" btnType="Default" disabled={!FormikProps.isValid || FormikProps.isSubmitting}>Submit</Button>
                    </Form>
                )}
            />
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, remember_me) => dispatch(actions.login(email, password, remember_me))
    }
}

export default connect(null, mapDispatchToProps)(Login);