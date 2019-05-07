import React, {Component} from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import AnonymousNavigation from '../AnonymousNavigation/AnonymousNavigation';
import Input from '../../UI/Input/Input'
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
import DrawerToggle from '../DrawerToggler/DrawerToggler';

class Toolbar extends Component {
    state = {
        searchInput: {
            elementConfig: {
                type: 'search',
                placeholder: 'Search',
                id: 'search',
                name: 'search',
                icon: {name: 'faSearch', position: 'Right'}
            },
            value: '',
            validation: {
                minLength: 3,
                maxLength: 50
            },
            valid: true,
            touched: false
        }
    }

    render(){
        return (
            <header className={classes.Toolbar}>
                <Logo height="80%"/>
                <DrawerToggle MobileMenuOpen={this.props.MobileMenuOpen} clicked={this.props.drawerToggleClicked}/>
                <div className={classes.DesktopOnly}>
                    <Input elementConfig={this.state.searchInput.elementConfig}/>
                    <AuthenticatedNavigation />
                    <AnonymousNavigation />
                </div>
            </header>
        )
    }
}

export default Toolbar;