import React,{Component} from 'react';
import RichEditor from '../../components/RichEditor/RichEditor';
import classes from './Home.module.scss';

class Home extends Component{
    render(){
        return(
            <div className={classes.Home}>
                <header className={classes.Editor}>
                    <RichEditor />
                </header>
            </div>
        )
    }
}

export default Home