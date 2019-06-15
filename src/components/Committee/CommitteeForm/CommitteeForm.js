import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import InputClasses from '../../UI/Input/Input.module.scss';
import Button from '../../UI/Button/Button';
class CommitteForm extends Component {
    
    render(){
        const initialValues={
            name: this.props.name || '',
            mentor: this.props.mentor || '',
            director: this.props.director || '',
            hr_od: this.props.hr_od || ''
        }
        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .trim()
                .required('Committee Name is a Required field')
                .min(3, 'Committee Name is too short it must be at least 3 characters or longer'),
            mentor: Yup.string()
                .trim()
                .required('Please select the Committee mentor'),
            director: Yup.string()
                .trim(),
            hr_od: Yup.string()
                .trim()
        });
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.handleSubmit}
                render={(FormikProps)=>(
                    <Form style={{justifyContent: 'flex-end'}}>
                        {this.props.error? <span>Sorry something went wrong please try again later</span>: null}
                        {this.props.message? <span>{this.props.message}</span>: null}
                        <div className={InputClasses.Input}>
                            <label htmlFor="name" className={InputClasses.Label} >Committee Name <span className="required">*</span></label>
                            <Field type="name" id="name" name="name" className={InputClasses.InputElement}/>
                            <ErrorMessage name="name" />
                        </div>
                        <div className={InputClasses.Input}>
                        <label htmlFor="mentor" className={InputClasses.Label} >Committee Mentor <span className="required">*</span></label>
                            <Field component="select" id="mentor" name="mentor" className={InputClasses.InputElement}>
                                <option value="">Select Comittee</option>
                                <option value="1">IT</option>
                            </Field>
                            <ErrorMessage name="mentor" />
                        </div>
                        <div className={InputClasses.Input}>
                        <label htmlFor="director" className={InputClasses.Label} >Committee Director <span className="required">*</span></label>
                            <Field component="select" id="director" name="director" className={InputClasses.InputElement}>
                                <option value="">Select Comittee</option>
                                <option value="1">IT</option>
                            </Field>
                            <ErrorMessage name="director" />
                        </div>
                        <div className={InputClasses.Input}>
                        <label htmlFor="hr_od" className={InputClasses.Label} >HR-Coordinator <span className="required">*</span></label>
                            <Field component="select" id="hr_od" name="hr_od" className={InputClasses.InputElement}>
                                <option value="">Select Comittee</option>
                                <option value="1">IT</option>
                            </Field>
                            <ErrorMessage name="hr_od" />
                        </div>
                        <Button type="submit" btnType="Default" disabled={!FormikProps.isValid || FormikProps.isSubmitting}>{this.props.adding?'ADD COMMITTEE': 'EDIT COMMITTEE'}</Button>
                    </Form>
                )}
            />
        )
    }
    
}

export default CommitteForm;