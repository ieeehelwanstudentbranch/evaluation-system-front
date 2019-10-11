import React, {Component} from 'react';
import * as classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideNavigation from '../../components/Navigation/SideNavigation/SideNavigation';
import { connect } from 'react-redux';
import NotificationsContainer from '../../components/UI/Notifications/NotificationsContainer/NotificationsContainer';
import Pusher from 'pusher-js';
import axios from '../../axios';
class Layout extends Component {
    state={
        showSideDrawer: false,
        MobileMenuOpen: false,
        showNotifications: false,
        notifications: [],
        numberOfNotifications: 0
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
        // this.pusher.connection.bind( 'error', function( err ) {
        //     console.log(err);
        // });
        // this.pusher.connection.bind( 'unavailable', function( ) {
        //     console.log('unavailable');
        // });
        // this.pusher.connection.bind( 'connected', function( ) {
        //     console.log('connected');
        // });
        // this.pusher.connection.bind( 'connecting', function( ) {
        //     console.log('connecting');
        // });
        this.channel.bind('task-created', (data)=>{
            let Notifications = JSON.parse(JSON.stringify(data));
            let totalNotifications = [...this.state.notifications, {...Notifications}]
            this.setState({
                notifications: totalNotifications,
                numberOfNotifications: this.state.numberOfNotifications+1
            });
        });
        this.channel.bind('post-created', (data)=>{
            let Notifications = JSON.parse(JSON.stringify(data));
            let totalNotifications = [...this.state.notifications, {...Notifications}]
            this.setState({
                notifications: totalNotifications,
                numberOfNotifications: this.state.numberOfNotifications+1
            });
        });
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false, MobileMenuOpen: false,})
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return {
                ...prevState,
                showSideDrawer: !prevState.showSideDrawer,
                MobileMenuOpen: !prevState.MobileMenuOpen
            }
        })
    }
    NotificationsHandler = () =>{
        this.setState(prevState => {
            return {
                ...prevState,
                showNotifications: !prevState.showNotifications,
                numberOfNotifications: 0
            }
        })
    }
    render(){
        return(
            <>
                <Toolbar isAuthenticated={this.props.isAuthenticated} MobileMenuOpen={this.state.MobileMenuOpen} drawerToggleClicked={this.sideDrawerToggleHandler} notificationsClicked={this.NotificationsHandler} numberOfNotifications={this.state.numberOfNotifications}/>
                <SideNavigation
                    isAuthenticated={this.props.isAuthenticated}
                    role={this.props.role}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    userID={this.props.userID}
                />
                <NotificationsContainer open={this.state.showNotifications} notifications={this.state.notifications}/>
                <main className={classes.MainApp}>
                    {this.props.children}
                </main>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null,
        role: state.user.userData? state.user.userData.position:null,
        userID: state.user.userData? state.user.userData.id:null
    }
}
export default connect(mapStateToProps)(Layout);