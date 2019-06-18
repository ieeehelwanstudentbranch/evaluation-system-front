import React,{Component} from 'react';
import RichEditor from '../../components/RichEditor/RichEditor';
import classes from './Home.module.scss';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Home extends Component{
    render(){
        return(
            <div className={classes.Home}>
                <header className={classes.Editor}>
                    <RichEditor />
                    <Button type="submit" btnType="Default" clicked={()=>this.props.submit(this.props.post)}>Submit</Button>
                </header>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        post: state.richEditor.data
    }
}

const mapDispatchToProps = dispatch => {
    return{
        submit: (data) => dispatch(actions.addPost(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)