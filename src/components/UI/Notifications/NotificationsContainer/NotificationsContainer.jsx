import React, {Component} from 'react';
import * as classes from './NotificationsContainer.module.scss';
import Pusher from 'pusher-js';

class NotificationsContainer extends Component{
    state={
        notifications: {}
    }
    componentDidMount(){
        const pusher = new Pusher('7b8882c6cc4c6a80206d', {
            cluster: 'us3',
            forceTLS: true,
            encrypted: true,
            // authEndpoint: 'http://localhost:8000/login',
            // authEndpoint: 'http://localhost:8000/pusher/auth', // just a helper method to create a link

            // auth:{
            //     headers:{
            //     //   'Accept':'application/json',
            //     //   'Authorization': 'bearer ' + localStorage.getItem('token')
            //         'X-CSRF-Token': 'bearer ' + localStorage.getItem('token')
            //     }
            // },
        });

        // let channelName = 'private-notification-' + localStorage.getItem('userID');
        const channel = pusher.subscribe("notification");
        channel.bind('notification', (data)=>{
            let Notifications = JSON.stringify(data);
            this.setState({notifications: {...this.state.notifications, Notifications}});
            console.log(Notifications);
        });
        channel.bind('task-created', (data)=>{
            let Notifications = JSON.stringify(data);
            this.setState({notifications: {...this.state.notifications, Notifications}});
            console.log(Notifications);
        });
    }
    
    render(){
        let Notifications = {
            message:{
                id:43,
                title: "dasdsadsa",
                body_sent: <p>sdkas;lkd;lkasd</p>,
                deadline: "2020-02-02T02:01",
                files_sent:null,
                files_deliver:null,
                body_deliver:null,
                evaluation:null,
                rate:null,
                status: 'pending',
                from:1,
                to:5,
                committee_id:1,
                created_at: '2019-09-11 17:30:31',
                updated_at: '2019-09-11 17:30:31'
            }
        }
        return(
            <div className={[classes.NotificationsContainer, this.props.open? classes.Open : classes.Close].join(' ')}>
                {
                    this.state.notifications.length>0?
                        this.state.notifications.map((notification, index)=>{
                            console.log(notification);
                        })
                    :null
                }
            </div>
        )
    }
}

export default NotificationsContainer;