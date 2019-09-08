import React, {Component} from 'react';
import * as classes from './NotificationsContainer.module.scss';

class NotificationsContainer extends Component{
    render(){
        return(
            <div className={[classes.NotificationsContainer, this.props.open? classes.Open : classes.Close].join(' ')}>
                
            </div>
        )
    }
}

export default NotificationsContainer;