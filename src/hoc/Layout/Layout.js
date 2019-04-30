import React, {Component} from 'react';
import './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideNavigation from '../../components/Navigation/SideNavigation/SideNavigation';
class Layout extends Component {
    state={
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }
    render(){
        return(
            <>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                {/* <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                /> */}
                <SideNavigation />
                <main>
                    {this.props.children}
                </main>
            </>
        )
    }
} 
export default Layout;