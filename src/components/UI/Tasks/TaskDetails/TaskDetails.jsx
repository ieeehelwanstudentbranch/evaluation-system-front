import React from 'react';
import * as classes from './TaskDetails.module.scss'
import InformationTemplate from '../../InformationTemplate/InformationTemplate';
import InformationHeader from '../../InformationHeader/InformationHeader';
import {endpoint} from '../../../../utilize/endpoint';
import {MdFileDownload} from 'react-icons/md';
const taskDetails = (props) => {
    let deadline = props.deadline?new Date(props.deadline):null,
        delivered_at = props.delivered_at?new Date(props.delivered_at):null,
        creating_time = props.created_at? new Date(props.created_at):null;
    return(
        <div className={[classes.TaskDetails, props.className].join(' ')}>
            {
                props.user?
                    <InformationHeader {...props.user} created_at={creating_time?creating_time:delivered_at}/>
                :null
            }
            {
                <InformationTemplate label="Task info">
                    {
                        props.title ?
                            <h2>{props.title}</h2>
                        : null
                    }
                    {
                        creating_time ?
                            <p>Creating Time: <time dateTime={creating_time}>{creating_time.getDate()}-{creating_time.getMonth()+1}-{creating_time.getFullYear()} at {creating_time.getHours()}:{creating_time.getMinutes()<9?'0'+creating_time.getMinutes():creating_time.getMinutes()}</time></p>
                        : null
                    }
                    {
                        delivered_at ?
                            <p>Delivering Time: <time dateTime={delivered_at}>{delivered_at.getDate()}-{delivered_at.getMonth()+1}-{delivered_at.getFullYear()} at {delivered_at.getHours()}:{delivered_at.getMinutes()<9?'0'+delivered_at.getMinutes():delivered_at.getMinutes()}</time></p>
                        : null
                    }
                    {
                        deadline ?
                            <p>Deadline: <time dateTime={deadline}>{deadline.getDate()}-{deadline.getMonth()+1}-{deadline.getFullYear()} at {deadline.getHours()}:{deadline.getMinutes()<9?'0'+deadline.getMinutes():deadline.getMinutes()}</time></p>
                        : null
                    }
                </InformationTemplate>
            }
            {
                props.details?
                    <InformationTemplate label="Task Details">
                        <article className={classes.TaskDetails} dangerouslySetInnerHTML = {{__html: props.details}}></article>
                    </InformationTemplate>
                :null
            }
            {
                props.files?
                    <InformationTemplate label="task files">
                        <ul className={classes.Files}>
                            {
                                props.files.map((file,index)=>(
                                    <li key={index}>{file}<a href={`${endpoint}/storage/tasks_sent/${file}`} download={true}><MdFileDownload /></a></li>
                                ))
                            }
                        </ul>
                    </InformationTemplate>
                :null
            }
        </div>
    )
}

export default taskDetails;