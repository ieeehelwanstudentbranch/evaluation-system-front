import React,{Component} from 'react';
import RichEditor from '../../components/RichEditor/RichEditor';
import classes from './Home.module.scss';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';

class Home extends Component{
    render(){
        return(
            <div className={classes.Home}>
                <header className={classes.Editor}>
                    <RichEditor />
                    <Button type="submit" btnType="Default">Submit</Button>
                </header>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{

    }
}

const mapDispatchToProps = dispatch => {
    return{
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)