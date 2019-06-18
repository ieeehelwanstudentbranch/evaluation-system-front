import React,{Component} from 'react';
import RichEditor from '../../components/RichEditor/RichEditor';
import classes from './Home.module.scss';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Post from '../../components/Post/Post';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';

class Home extends Component{
    state={
        error: this.props.error,
        loading: this.props.loading
    }
    componentDidUpdate(previousProps, previousState){
        let error = this.props.error;
        let loading = this.props.loading;
        if (previousState.error !== error || previousState.loading !== loading) {
            this.setState({
                error: error,
                loading: loading
            })
        }
    }
    componentDidMount(){
        this.props.onInit();
    }
    CancelHandler=()=>{
        this.setState({
            error: null,
        })
    }
    render(){
        let component;
        if(this.props.posts){
            component = <section>
                {
                    this.props.posts?
                        this.props.posts.map(post=>{
                            return (
                                <Post body={post.body} postOwner={post.post_owner} postDateTime={post.created_at} />
                            ) 
                        }):
                    <> </>
                }
            </section>
        } else {
            if(this.state.loading){
                component = <Spinner />
            } else if(this.props.error){
                component = <Modal show={this.state.error} modalClosed={this.CancelHandler}>{this.state.error}</Modal>
            }
        }
        return(
            <div className={classes.Home}>
                <header className={classes.Editor}>
                    <RichEditor />
                    <Button type="submit" btnType="Default" clicked={()=>this.props.submit(this.props.post)}>Submit</Button>
                </header>
                {component}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        post: state.richEditor.data,
        posts: state.richEditor.posts,
        loading: state.richEditor.loading,
        error: state.richEditor.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInit: ()=> dispatch(actions.fetchPosts()),
        submit: (data) => dispatch(actions.addPost(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)