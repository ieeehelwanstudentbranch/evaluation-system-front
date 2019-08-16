import React, {Component} from 'react';
import * as classes from './PublicLayout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import PublicSideNav from './PublicSideNav/PublicSideNav';
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
            <div className={classes.PublicLayout}>
                <div className="container">
                    <Toolbar className={classes.PublicToolBar}  MobileMenuOpen={this.state.MobileMenuOpen} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                </div>
                <PublicSideNav
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.PublicMain}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null
    }
}
export default connect(mapStateToProps)(Layout);