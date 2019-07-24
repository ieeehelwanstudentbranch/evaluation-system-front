import React, { Component } from 'react';
import * as classes from './SingleTask.module.scss';
import axios from '../../axios';
import {connect} from 'react-redux';
import InformationHeader from '../../components/UI/InformationHeader/InformationHeader.jsx';
import { MdFileDownload } from "react-icons/md";

class SingleTask extends Component{
    state={
        id: null,
        // sent details
        title: null,
        details: null,
        files: null,
        deadline: null,
        created_at: null,
        sender_info: null,
        reciever_info: null,
        // deliverd details
        delivered_details: null,
        delivered_files: null,
        delivered_at: null
    }
    componentDidMount(){
        axios.get(`${this.props.location.pathname}`)
            .then(response=>{
                console.log(response.data.data)
                this.setState({
                    id: this.props.match.params.id,
                    title: response.data.data.title,
                    details: response.data.data.details,
                    files: response.data.data.sent_files?response.data.data.sent_files:null,
                    deadline: response.data.data.deadline,
                    created_at: response.data.data.created_at.date,
                    sender_info: response.data.data.sender_info[0],
                    delivered_files: response.data.data.delivered_files?response.data.data.delivered_files:null,
                    delivered_details: response.data.data.delivered_details?response.data.data.delivered_details:null,
                    reciever_info: response.data.data.reciever_info? response.data.data.reciever_info[0]: null,
                })
            }).catch(error=>{
                console.log(error)
            })
    }
    render(){
        // let deadline = new Date(this.state.deadline),
        //     delivered_at = new Date(this.state.delivered_at);
        let task= <> </>;
        if (this.state.title){
            task = <div className={classes.SinglePost}>
                {this.state.sender_info ?
                    <InformationHeader {...this.state.sender_info} created_at={this.state.created_at}/>: <></>
                }
                {this.state.details?
                    <div className={classes.Details}>
                        <span className={classes.Title}>Task Details</span>
                        <article dangerouslySetInnerHTML = {{__html: this.state.details}}></article>
                    </div>
                    :null
                }
                {
                    this.state.files?
                        <div className={classes.Details}>
                            <span className={classes.Title}>Task Files</span>
                            <ul className={classes.Files}>
                                {
                                    this.state.files.map((file,index)=>(
                                        <li key={index}>{file}<a href={`http://localhost:8000/storage${file}`} download><MdFileDownload /></a></li>
                                    ))
                                }
                            </ul>
                        </div>
                    :null
                }
                
            </div>
        }
        return (
            task
        )
    }
}

const mapStateToProps = state => {
    return{
        userID: state.login.userID
    }
}
export default connect(mapStateToProps, null)(SingleTask)