import React, {Component} from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Input from '../../UI/Input/Input'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
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
                
                <div className={classes.test + ' ' + classes.DesktopOnly}>
                        <Input elementConfig={this.state.searchInput}/>
                        <nav>
                            <ul>
                                <NavigationItem link="/" exact>Home</NavigationItem>
                                <NavigationItem link="/profile" exact>profile</NavigationItem>
                            </ul>
                        </nav>
                    <NavigationItems />
                </div>
                

            </header>
        )
    }
}

export default Toolbar;