import React, {Component} from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import AnonymousNavigation from '../AnonymousNavigation/AnonymousNavigation';
import Input from '../../UI/Input/Input'
import AuthenticatedNavigation from '../AuthenticatedNavigation/AuthenticatedNavigation';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

class Toolbar extends Component {
    state = {
        searchInput: {
            elementConfig: {
                type: 'search',
                placeholder: 'Search',
                id: 'search',
                name: 'search'
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
                {/* <DrawerToggle clicked={props.drawerToggleClicked}/> */}
                <Logo height="80%"/>
                <div className={classes.DesktopOnly}>
                    <Input elementConfig={this.state.searchInput}/>

                    <AuthenticatedNavigation />

                    <AnonymousNavigation />
                </div>
            </header>
        )
    }
}

export default Toolbar;