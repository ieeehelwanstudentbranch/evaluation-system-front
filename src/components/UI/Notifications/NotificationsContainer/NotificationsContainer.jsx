import React, {Component} from 'react';
import * as classes from './NotificationsContainer.module.scss';
import NotificationItem from '../../../NotificationItem/NotificationItem';
import {connect} from 'react-redux';

class NotificationsContainer extends Component{
    
    render(){
        let sorted = (this.props.notifications&&this.props.notifications.length>0)?
            this.props.notifications.sort((a,b)=>{
                return a.created_at>b.created_at ? -1 : a.created_at<b.created_at ? 1 : 0;
            })
        :<p>There is no notification that we can display to you</p>;
        return(
            <div className={[classes.NotificationsContainer, this.props.open? classes.Open : classes.Close].join(' ')}>
                {
                    (sorted&&sorted.length>0)?
                        sorted.filter(notification=>{
                            return notification.to === this.props.userID || notification.to === null
                        }).filter(notification=>{
                            return notification.from.id !== this.props.userID
                        }).map(notification=>{
                            return (
                                <NotificationItem key={notification.id} {...notification}/>
                            )
                        })
                    :<p>There is no notification that we can display to you</p>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userID: state.user.userData? state.user.userData.id:null
    }
}

export default connect (mapStateToProps, null)(NotificationsContainer);