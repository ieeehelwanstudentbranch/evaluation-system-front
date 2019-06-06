import React, {Component} from 'react';
import './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideNavigation from '../../components/Navigation/SideNavigation/SideNavigation';
import { connect } from 'react-redux';
class Layout extends Component {
    state={
        showSideDrawer: false,
        MobileMenuOpen: false,
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false, MobileMenuOpen: false,})
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer,
                MobileMenuOpen: !prevState.MobileMenuOpen
            }
        })
    }
    render(){
        return(
            <>
                <Toolbar isAuthenticated={this.props.isAuthenticated} MobileMenuOpen={this.state.MobileMenuOpen} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideNavigation
                    isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main>
                    {this.props.children}
                </main>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null
    }
}
export default connect(mapStateToProps)(Layout);