import React from 'react';
import {MdNotificationsNone} from 'react-icons/md';
import * as classes from './Notifications.module.scss';
const notifications = (props) => (
    <div className={[props.className, classes.Notifications].join(' ')} onClick={props.clicked}>
        <MdNotificationsNone />
        <span className={classes.NotificationsNumber}>
            {props.NumberOfNotifications}
        </span>
    </div>
)

export default notifications;