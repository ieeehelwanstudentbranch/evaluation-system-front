import React, {Component} from 'react';
import Login from '../Auth/Login/Login';
import * as classes from './Home.module.scss'
class Home extends Component{
    render(){
        return(
            <header style={{width: '100%'}}>
                <div className={`${classes.HomeHeader} container`}>
                    <div className={classes.Intro}>
                        <h3>Work Better Together. Schedule Meetings In An Instant.</h3>
                        <p>An easier way to collaborate with your team or friends. You set up the meeting and set the priority. deicide who to invite and get started</p>
                    </div>
                    <Login className={classes.Login} />
                </div>
            </header>
        )
    }
}
export default Home;