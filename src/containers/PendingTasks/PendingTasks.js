import React,{Component} from 'react';
import TaskCard from '../../components/TaskCard/TaskCard';
import * as classes from '../../assets/scss/TasksPage.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Spinner/Spinner'
import chunkData from '../../utilize/chunkData';
import mappingFunction from '../../utilize/mappingFunction';
class PendingTasks extends Component{

    state={
        // user role for some validation
        userRole: null,
        // total tasks 
        totalPersonalTasks: null,
        totalMentoringTasks: null,
        totalSentTasks: null,
        totalCoordinatingTasks: null,
        // chunked tasks
        sentTasksArrays: null,
        mentoringTasksArrays: null,
        personalTasksArrays: null,
        coordinatingTasksArrays: null,
        // displayed tasks
        sentTasks: [],
        mentoringTasks: [],
        personalTasks: [],
        coordinatingTasks: []
    }

    loadMore = (type) => {
        if (this.state.sentTasksArrays && (type === 'sentTasks')){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    sentTasks: prevState.sentTasks.concat(prevState.sentTasksArrays[0]),
                    sentTasksArrays: prevState.sentTasksArrays.filter((array, index)=>index!==0)
                }
            })
        }
        if (this.state.mentoringTasksArrays && (type === 'mentoringTasks')){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    mentoringTasks: prevState.mentoringTasks.concat(prevState.mentoringTasksArrays[0]),
                    mentoringTasksArrays: prevState.mentoringTasksArrays.filter((array, index)=>index!==0)
                }
            })
        }
        if (this.state.personalTasksArrays && (type === 'personalTasks')){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    personalTasks: prevState.personalTasks.concat(prevState.personalTasksArrays[0]),
                    personalTasksArrays: prevState.personalTasksArrays.filter((array, index)=>index!==0)
                }
            })
        }
        if (this.state.coordinatingTasksArrays && (type === 'coordinatingTasks')){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    coordinatingTasks: prevState.coordinatingTasks.concat(prevState.coordinatingTasksArrays[0]),
                    coordinatingTasksArrays: prevState.coordinatingTasksArrays.filter((array, index)=>index!==0)
                }
            })
        }
    }

    componentDidMount() {
        this.props.fetchTasks('pending');
        setTimeout(()=>{
            this.loadMore('sentTasks');
            this.loadMore('mentoringTasks');
            this.loadMore('personalTasks')
            this.loadMore('coordinatingTasks')
        },2000)
    }

    componentDidUpdate(previousProps, previousState) {
        let totalMentoringTasks = this.props.pendingMentoringTasks,
            totalPersonalTasks =  this.props.pendingPersonalTasks,
            totalSentTasks = this.props.pendingSentTasks,
            totalCoordinatingTasks = this.props.pendingCoordinatingTasks,
            userRole = this.props.role;

        if (previousState.totalMentoringTasks !== totalMentoringTasks ||
            previousState.totalPersonalTasks !== totalPersonalTasks ||
            previousState.totalSentTasks !== totalSentTasks ||
            previousState.totalCoordinatingTasks !== totalCoordinatingTasks ||
            previousState.userRole !== userRole
            ) {
                let sentTasksArrays = chunkData(totalSentTasks, 5),
                    mentoringTasksArrays = chunkData(totalMentoringTasks, 5),
                    personalTasksArrays = chunkData(totalPersonalTasks, 5),
                    coordinatingTasksArrays = chunkData(totalCoordinatingTasks, 5);
                this.setState(prevState=>{
                    return {
                        ...prevState,
                        // set total pending tasks
                        totalMentoringTasks: totalMentoringTasks,
                        totalSentTasks: totalSentTasks,
                        totalPersonalTasks: totalPersonalTasks,
                        totalCoordinatingTasks: totalCoordinatingTasks,

                        // set chunked tasks array
                        sentTasksArrays: sentTasksArrays,
                        mentoringTasksArrays: mentoringTasksArrays,
                        personalTasksArrays: personalTasksArrays,
                        coordinatingTasks: coordinatingTasksArrays,

                        userRole: userRole
                    }
                })
        }
    }

    render(){
        return (
            <div className={classes.TasksPage}>
                {
                    (this.state.userRole === 'EX_com') || (this.state.userRole === 'director') ?
                        this.state.sentTasksArrays?
                            <section className={classes.TasksGroup}>
                                <h2>Sent Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.sentTasks}
                                    next={()=>this.loadMore('sentTasks')}
                                    hasMore={this.state.sentTasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.sentTasks, TaskCard)
                                    }
                                </InfiniteScroll>
                            </section>:
                        <></>
                    :<></>
                }
                {
                    (this.state.userRole === 'EX_com')?
                        this.state.mentoringTasksArrays?
                            <section className={classes.TasksGroup}>
                                <h2>Mentoring Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.mentoringTasks}
                                    next={()=>this.loadMore('mentoringTasks')}
                                    hasMore={this.state.mentoringTasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.mentoringTasks, TaskCard)
                                    }
                                </InfiniteScroll>
                            </section>
                        :<></>
                    :<></>
                }
                {
                (this.state.userRole === 'EX_com') || (this.state.userRole === 'director') || (this.state.userRole === 'volunteer') ?
                    this.state.totalPersonalTasks?
                        this.state.totalPersonalTasks.length>0?
                            <section className={classes.TasksGroup}>
                                <h2>Personal Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.mentoringTasks}
                                    next={()=>this.loadMore('personalTasks')}
                                    hasMore={this.state.personalTasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.personalTasks, TaskCard)
                                    }
                                </InfiniteScroll>
                            </section>
                        :<></>
                    :<></>
                :<></>
                }
                {
                    this.state.totalCoordinatingTasks?
                        (this.state.totalCoordinatingTasks.length > 0)?
                            <section className={classes.TasksGroup}>
                                <h2>Personal Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.coordinatingTasks}
                                    next={()=>this.loadMore('coordinatingTasks')}
                                    hasMore={this.state.coordinatingTasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.coordinatingTasks, TaskCard)
                                    }
                                </InfiniteScroll>
                            </section>
                        :<></>
                    :<></>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pendingMentoringTasks: state.tasks.pendingMentoringTasks?state.tasks.pendingMentoringTasks:null,
        pendingSentTasks: state.tasks.pendingSentTasks?state.tasks.pendingSentTasks:null,
        pendingPersonalTasks: state.tasks.pendingPersonalTasks?state.tasks.pendingPersonalTasks:null,
        pendingCoordinatingTasks: state.tasks.pendingCoordinatingTasks?state.tasks.pendingCoordinatingTasks:null,
        role: state.user.userData? state.user.userData.position : null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchTasks: (type)=>dispatch(actions.fetchTasks(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingTasks);