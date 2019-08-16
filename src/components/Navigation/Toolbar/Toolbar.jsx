import React, {Component} from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/WhiteLogo';
import AnonymousNavigation from '../AnonymousNavigation/AnonymousNavigation';
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import DrawerToggle from '../DrawerToggler/DrawerToggler';

class Toolbar extends Component {
    render(){
        return (
            <header className={[classes.Toolbar, this.props.className].join(' ')}>
                <Logo height="80%"/>
                <DrawerToggle MobileMenuOpen={this.props.MobileMenuOpen} clicked={this.props.drawerToggleClicked}/>
                <div className={classes.DesktopOnly}>
                {this.props.isAuthenticated ?
                    <>
                        <AuthenticatedNavigation />
                    </> : <AnonymousNavigation />
                }
                </div>
            </header>
        )
    }
}

export default Toolbar;