import React, {Component} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {connect} from 'react-redux';
import * as Yup from 'yup';
import classes from '../../../../UI/Input/Input.module.scss';
import Spinner from '../../../../UI/Spinner/Spinner';
import axios from '../../../../../axios';

class CommentForm extends Component{
    state={
        error: null,
        loading: false,
        comment: ''
    }
    componentDidUpdate(previousProps, previousState) {
        let comment = this.props.comment;
        if (previousState.comment !== comment) {
            this.setState({
                comment: comment
            })
        }
    }
    handleSubmit = (values, {props = this.props, setSubmitting }) => {
        if (this.props.commentID){
            this.setState({loading: true});
            let newData = {
                comment_body: values.comment
            }
            axios.post(`/post/${this.props.commentID}/update-comment/`, newData)
                .then(response=>{
                    window.location.reload();
                }).catch(error=>{
                    console.log(error.response);
                })
            ;
        }else{
            this.setState({loading: true});
            let comment = {
                comment_body: values.comment
            }
            axios.post(`/post/${this.props.id}/add-comment`, comment)
                .then(response=>{
                    window.location.reload();
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
                .trim()
                .nullable()
        });
        const initialValues= {
            comment: this.state.comment,
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
                        <Form>
                            {/* {this.state.error? <span>Sorry something went wrong please try again later</span>: null} */}
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

const mapStateToProps = state => {
    return {
        commentID: state.posts.commentID,
        comment: state.posts.comment
    }
}

export default connect(mapStateToProps)(CommentForm);