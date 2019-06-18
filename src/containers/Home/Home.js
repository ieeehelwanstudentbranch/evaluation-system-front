import React,{Component} from 'react';
import RichEditor from '../../components/RichEditor/RichEditor';
import classes from './Home.module.scss';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Post from '../../components/Post/Post'

class Home extends Component{
    componentDidMount(){
        this.props.onInit();
    }
    render(){
        return(
            <div className={classes.Home}>
                <header className={classes.Editor}>
                    <RichEditor />
                    <Button type="submit" btnType="Default" clicked={()=>this.props.submit(this.props.post)}>Submit</Button>
                </header>
                <section>
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
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        post: state.richEditor.data,
        posts: state.richEditor.posts
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onInit: ()=> dispatch(actions.fetchPosts()),
        submit: (data) => dispatch(actions.addPost(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)