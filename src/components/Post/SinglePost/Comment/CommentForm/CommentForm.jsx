import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classes from '../../../../UI/Input/Input.module.scss';
import Spinner from '../../../../UI/Spinner/Spinner';
import axios from '../../../../../axios';

class CommentForm extends Component{
    state={
        error: null,
        comment: ''
    }
    componentDidUpdate(previousProps, previousState) {
        let comment = this.props[0]?this.props[0].body:null;
        if (previousState.comment !== comment) {
            this.setState({
                comment: comment
            })
        }
    }
    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        if (props[0]){
            let newData = {
                comment_body: values.comment
            }
            axios.put(`/update-comment/${props[0].id}`, newData)
                .then(response=>{
                    console.log(response)
                    // window.location.reload();
                }).catch(error=>{
                    this.setState({error: error})
                })
            ;
        }else{
            let comment = {
                comment_body: values.comment
            }
            axios.post(`/post/${props.id}/add-comment`, comment)
                .then(response=>{
                    console.log(response)
                    // window.location.reload();
                }).catch(error=>{
                    this.setState({error: error})
                })
            ;
            setSubmitting(false);
        }
        
    }

    render(){
        const validationSchema = Yup.object().shape({
            comment: Yup.string()
                .nullable()
                .trim()
                
        });
        const initialValues= {
            comment: this.state.comment || '',
        }
        let form;
        if (this.state.loading){
            form = <Spinner />
        } else {
            form = <>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                    render={(FormikProps)=>(
                        <Form autoComplete="off">
                            {this.state.error? <span>Sorry something went wrong please try again later</span>: null}
                            <div className={classes.Input}>
                                <Field type="text" id="comment" name="comment" placeholder="Write a comment" className={classes.InputElement}/>
                                <ErrorMessage name="comment" />
                            </div>
                        </Form>
                    )}
                />
            </>
        }
        
        return(
            <div>
                {form}
            </div>
        );
    }
}

export default CommentForm;