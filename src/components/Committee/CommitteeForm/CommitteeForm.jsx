import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import InputClasses from '../../UI/Input/Input.module.scss';
import Button from '../../UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios';
class CommitteForm extends Component {
    state ={
        mentors: null,
        directors: null,
        hrs_od: null,
        initialValues: {
            name: '',
            mentor: '',
            director: '',
            hr_od: ''
        }
    }

    componentDidUpdate(previousProps, previousState) {
        let initialValues = this.props.committeeData;
        if (previousState.initialValues !== initialValues) {
            this.setState({
                initialValues: initialValues
            })
        }
    }

    componentDidMount(){
        axios.get('/addcommittee')
        .then(response=>{
            let mentors = response.data.data.mentor;
            let directors = response.data.data.director;
            let hrs_od = response.data.data['hr-od'];
            this.setState({
                mentors: mentors,
                directors: directors,
                hrs_od: hrs_od
            });
        })
        .catch(error => {
            this.setState({error: error});
            console.log(error)
        })
    }

    handleSubmit = (values, {props = this.props, setSubmitting }) =>{
        if(props.adding){
            props.onAdding(values.name, values.mentor, values.director, values.hr_od);
        } else {
            props.onEditing(props.committeeData.id, values.name, values.mentor, values.director, values.hr_od);
        }
    }
    
    render(){
        const validationSchema = Yup.object().shape({
            name: Yup.string()
                .trim()
                .required('Committee Name is a Required field')
                .min(3, 'Committee Name is too short it must be at least 3 characters or longer'),
            mentor: Yup.string()
                .nullable()
                .notRequired(),
            director: Yup.string()
                .nullable()
                .notRequired(),
            hr_od: Yup.string()
                .nullable()
                .notRequired()
            ,
        });
        const initialValues=this.state.initialValues;
        return (
            <Formik
                enableReinitialize={true}
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
                                <option value="">Select Committee Mentor</option>
                                { this.state.mentors ?
                                    this.state.mentors.map((mentor, index)=>{
                                    return (
                                        <option key={index} value={mentor.id}>{`${mentor.firstName} ${mentor.lastName}`}</option>
                                    )
                                    }): <option value="">failed to get mentors, please try again later</option>
                                }
                            </Field>
                            <ErrorMessage name="mentor" />
                        </div>
                            <div className={InputClasses.Input}>
                                <label htmlFor="director" className={InputClasses.Label} >Committee Director</label>
                                <Field component="select" id="director" name="director" className={InputClasses.InputElement}>
                                    <option value="">Select Committee Director</option>
                                    {this.state.directors?
                                        this.state.directors.map((director, index)=>{
                                            return (
                                                <option key={index} value={director.id}>{`${director.firstName} ${director.lastName}`}</option>
                                            )
                                        }):<></>
                                    }
                                </Field>
                                <ErrorMessage name="director"/>
                            </div>
                            <div className={InputClasses.Input}>
                                <label htmlFor="hr_od" className={InputClasses.Label} >HR-Coordinator</label>
                                <Field component="select" id="hr_od" name="hr_od" className={InputClasses.InputElement}>
                                    <option value="">Select HR-Coordinator for the committee</option>
                                    { this.state.hrs_od ?
                                        this.state.hrs_od.map((hr_od, index)=>{
                                        return (
                                            <option key={index} value={hr_od.id}>{`${hr_od.firstName} ${hr_od.lastName}`}</option>
                                        )
                                        }): <option value="">failed to get HR-Coordinators, please try again later</option>
                                    }
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

const mapDispatchToProps = dispatch => {
    return {
        onAdding: (name, mentor, director, hr_od)=> dispatch(actions.addCommittee(name, mentor, director, hr_od)),
        onEditing: (id ,name, mentor, director, hr_od)=> dispatch(actions.editCommittee(id, name, mentor, director, hr_od))
    }
}

export default connect(null, mapDispatchToProps)(CommitteForm);