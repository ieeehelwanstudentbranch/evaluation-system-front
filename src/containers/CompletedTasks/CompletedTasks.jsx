import React,{Component} from 'react';
import * as classes from '../../assets/scss/TasksPage.module.scss';
import TaskCard from '../../components/TaskCard/TaskCard';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Spinner/Spinner'
import chunkData from '../../utilize/chunkData';
import mappingFunction from '../../utilize/mappingFunction';
import state from '../../utilize/tasksState';
import loadMore from '../../utilize/loadMore';

class CompletedTasks extends Component{

    state={...state}

    componentDidMount() {
        this.props.fetchTasks('completed');
        setTimeout(()=>{
            this.setState(loadMore(this.state, this.state.sentTasks, 'sentTasks'));
            this.setState(loadMore(this.state, this.state.personalTasks, 'personalTasks'));
            this.setState(loadMore(this.state, this.state.mentoringTasks, 'mentoringTasks'));
            this.setState(loadMore(this.state, this.state.coordinatingTasks, 'coordinatingTasks'));
        },2000)
    }

    componentDidUpdate(previousProps, previousState) {
        let props = this.props;
        let totalMentoringTasks = props.pendingMentoringTasks,
            totalPersonalTasks =  props.pendingPersonalTasks,
            totalSentTasks = props.pendingSentTasks,
            totalCoordinatingTasks = props.pendingCoordinatingTasks,
            userRole = props.role;

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
                        userRole: userRole,
                        // set tasks
                        mentoringTasks: {
                            ...prevState.mentoringTasks,
                            totalTasks: totalMentoringTasks,
                            tasksArrays: mentoringTasksArrays
                        },
                        sentTasks: {
                            ...prevState.sentTasks,
                            totalTasks: totalSentTasks,
                            tasksArrays: sentTasksArrays,
                        },
                        personalTasks: {
                            ...prevState.personalTasks,
                            totalTasks: totalPersonalTasks,
                            tasksArrays: personalTasksArrays,
                        },
                        coordinatingTasks: {
                            ...prevState.coordinatingTasks,
                            totalTasks: totalCoordinatingTasks,
                            tasksArrays: coordinatingTasksArrays,
                        }
                    }
                })
            ;
        }
    }

    render(){
        return (
            <div className={classes.TasksPage}>
                {
                    (this.state.userRole === 'EX_com') || (this.state.userRole === 'director') ?
                        this.state.sentTasks.tasksArrays?
                            <section className={classes.TasksGroup}>
                                <h2>Sent Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.sentTasks.tasks}
                                    // next={()=>loadMore(this.state, this.state.sentTasks, 'sentTasks')}
                                    next={()=>this.setState(loadMore(this.state, this.state.sentTasks, 'sentTasks'))}
                                    hasMore={this.state.sentTasks.tasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    { mappingFunction(this.state.sentTasks.tasks, TaskCard) }
                                </InfiniteScroll>
                            </section>
                        :<p>No tasks have been completed, you need to encourage your team to get better results.</p>
                    :<p>You're not authorized to access this part</p>
                }
                {
                    (this.state.userRole === 'EX_com')?
                        this.state.mentoringTasks.tasksArrays?
                            <section className={classes.TasksGroup}>
                                <h2>Mentoring Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.mentoringTasks.tasks}
                                    next={()=>this.setState(loadMore(this.state, this.state.mentoringTasks, 'mentoringTasks'))}
                                    hasMore={this.state.mentoringTasks.tasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.mentoringTasks.tasks, TaskCard)
                                    }
                                </InfiniteScroll>
                            </section>
                        :<p>No tasks have been completed, you need to encourage committee directors or who's responsible, to get better results.</p>
                    :<p>You're not authorized to access this part</p>
                }
                {
                (this.state.userRole === 'EX_com') || (this.state.userRole === 'director') || (this.state.userRole === 'volunteer') ?
                    this.state.personalTasks.totalTasks?
                        this.state.personalTasks.totalTasks.length>0?
                            <section className={classes.TasksGroup}>
                                <h2>Personal Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.personalTasks.tasks}
                                    next={()=>this.setState(loadMore(this.state, this.state.personalTasks, 'personalTasks'))}
                                    hasMore={this.state.personalTasks.tasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.personalTasks.tasks, TaskCard)
                                    }
                                </InfiniteScroll>
                            </section>
                        :<></>
                    :<p>No tasks have been completed, you need to motivate your self or if you have a problem ask for help.</p>
                :<p>You're not authorized to access this part</p>
                }
                {
                    this.state.coordinatingTasks.tasks.length>0?
                        (this.state.coordinatingTasks.totalTasks.length > 0)?
                            <section className={classes.TasksGroup}>
                                <h2>Coordinating Tasks</h2>
                                <InfiniteScroll
                                    dataLength={this.state.coordinatingTasks.tasks}
                                    next={()=>this.setState(loadMore(this.state, this.state.coordinatingTasks, 'coordinatingTasks'))}
                                    hasMore={this.state.coordinatingTasks.tasksArrays.length>0}
                                    loader={<Spinner />}
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b>There is no more tasks to show</b>
                                        </p>
                                    }
                                    height={'80vh'}
                                >
                                    {
                                        mappingFunction(this.state.coordinatingTasks.tasks, TaskCard)
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
        completedMentoringTasks: state.tasks.completedMentoringTasks?state.tasks.completedMentoringTasks:null,
        completedSentTasks: state.tasks.completedSentTasks?state.tasks.completedSentTasks:null,
        completedPersonalTasks: state.tasks.completedPersonalTasks?state.tasks.completedPersonalTasks:null,
        completedCoordinatingTasks: state.tasks.completedCoordinatingTasks?state.tasks.completedCoordinatingTasks:null,
        role: state.user.userData? state.user.userData.position : null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchTasks: (type)=>dispatch(actions.fetchTasks(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTasks);