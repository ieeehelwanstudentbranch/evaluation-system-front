import React, {Component} from 'react';
import Login from '../Auth/Login/Login';
import * as classes from './Home.module.scss'
class Home extends Component{
    render(){
        return(
            <header className={classes.HomeHeader}>
                <Login className={classes.Login} />
            </header>
        )
    }
}
export default Home;