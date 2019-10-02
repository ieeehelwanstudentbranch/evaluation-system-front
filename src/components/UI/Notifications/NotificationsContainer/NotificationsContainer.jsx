import React, {Component} from 'react';
import * as classes from './NotificationsContainer.module.scss';
import Pusher from 'pusher-js';
import NotificationItem from '../../../NotificationItem/NotificationItem';
import axios from '../../../../axios';

class NotificationsContainer extends Component{
    state={
        notifications: []
    }
    pusher = new Pusher('7b8882c6cc4c6a80206d', {
        cluster: 'us3',
        forceTLS: true,
        encrypted: true,
    });
    channel = this.pusher.subscribe("notification");
    componentDidMount(){
        axios.get(`/notification`)
            .then(response=>{
                this.setState({notifications: [...this.state.notifications, ...response.data]});
            }).catch(error=>{
                console.log(error.response)
            });
        this.channel.bind('task-created', (data)=>{
            let Notifications = JSON.parse(JSON.stringify(data));
            // let totalNotifications = [...this.state.notifications, {...Notifications}]
            // this.setState({notifications: totalNotifications});
            this.setState(prevState=>{
                let newNotifications = prevState.notifications.push(Notifications)
                return {
                    notifications: newNotifications
                }
            });
        });
        this.channel.bind('post-created', (data)=>{
            let Notifications = JSON.parse(JSON.stringify(data));
            let totalNotifications = [...this.state.notifications, {...Notifications}]
            this.setState({notifications: totalNotifications});
        });
    }
    
    render(){
        let sorted = (this.state.notifications&&this.state.notifications.length>0)?
            this.state.notifications.sort((a,b)=>{
                return a.created_at>b.created_at ? -1 : a.created_at<b.created_at ? 1 : 0;
            })
        :null;
        return(
            <div className={[classes.NotificationsContainer, this.props.open? classes.Open : classes.Close].join(' ')}>
                {
                    (sorted&&sorted.length>0)?
                        sorted.map(notification=>{
                            return (
                                <NotificationItem key={notification.id} {...notification}/>
                            )
                        })
                    :null
                }
            </div>
        )
    }
}

export default NotificationsContainer;