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
        loading: this.props.loading,
        editing: this.props.editing,
        id: this.props.id
    }
    componentDidUpdate(previousProps, previousState){
        let error = this.props.error;
        let loading = this.props.loading;
        let editing = this.props.editing;
        let id = this.props.id;
        if (previousState.error !== error || previousState.loading !== loading || previousState.editing !== editing || previousState.id !== id) {
            this.setState({
                error: error,
                loading: loading,
                editing: editing,
                id: id
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
                        this.props.posts.map((post,index)=>{
                            console.log(post)
                            return (
                                <Post key={index} comments={post.comments} postID={post.id} body={post.body} postOwner={post.post_owner} date_time={post.created_at} />
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
                    <RichEditor place="posts"/>
                    {
                        this.state.editing? 
                        <Button type="submit" btnType="Default" clicked={()=>this.props.onEditing(this.state.id, this.props.post)}>POST EDITING</Button>:
                        <Button type="submit" btnType="Default" clicked={()=>this.props.onAdding(this.props.post)}>ADD POST</Button>
                    }
                    
                </header>
                {component}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        post: state.posts.data,
        posts: state.posts.posts,
        loading: state.posts.loading,
        error: state.posts.error,
        editing: state.posts.editing,
        id: state.posts.postID
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInit: ()=> dispatch(actions.fetchPosts()),
        onAdding: (data) => dispatch(actions.addPost(data)),
        onEditing: (id, data) => dispatch(actions.editPostStart(id, data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)