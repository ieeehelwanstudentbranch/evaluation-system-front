import React,{Component} from 'react';
import Task from '../../components/Task/Task';
import classes from './PendingTasks.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Spinner/Spinner'

class PendingTasks extends Component{

    state={
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

    chunkData = (array, size) => {
        if (array){
            let buffer = [];
            return array.reduce((acc, item, i) => {
                let isLast = i === array.length - 1;
                if (buffer.length === size) {
                    let theChunk = [...buffer];
                    buffer = [item];
                    return [...acc, theChunk];
                } else {
                    buffer.push(item);
                    if (isLast) {
                        return [...acc, buffer];
                    } else {
                        return acc;
                    }
                }
            }, []);
        }
    }

    loadMore = (type) => {
        if (this.state.sentTasksArrays && type === 'sentTasks'){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    sentTasks: prevState.sentTasks.concat(prevState.sentTasksArrays[0]),
                    sentTasksArrays: prevState.sentTasksArrays.filter((array, index)=>index!==0)
                }
            })
        }
        if (this.state.mentoringTasksArrays && type === 'mentoringTasks'){
            this.setState(prevState=>{
                return {
                    ...prevState,
                    mentoringTasks: prevState.mentoringTasks.concat(prevState.mentoringTasksArrays[0]),
                    mentoringTasksArrays: prevState.mentoringTasksArrays.filter((array, index)=>index!==0)
                }
            })
        }
    }



    componentDidMount() {
        this.props.fetchPendingTasks();
        setTimeout(()=>{
            this.loadMore('sentTasks');
            
        }, 2000)
        setTimeout(()=>{
            this.loadMore('mentoringTasks')
        },5000)
    }

    componentDidUpdate(previousProps, previousState) {
        let totalMentoringTasks = this.props.pendingMentoringTasks,
            totalPersonalTasks =  this.props.pendingPersonalTasks,
            totalSentTasks = this.props.pendingSentTasks,
            totalCoordinatingTasks = this.props.pendingCoordinatingTasks;

        if (previousState.totalMentoringTasks !== totalMentoringTasks ||
            previousState.totalPersonalTasks !== totalPersonalTasks ||
            previousState.totalSentTasks !== totalSentTasks ||
            previousState.totalCoordinatingTasks !== totalCoordinatingTasks
            ) {
                let sentTasksArrays = this.chunkData(totalSentTasks, 5),
                    mentoringTasksArrays = this.chunkData(totalMentoringTasks, 5),
                    personalTasksArrays = this.chunkData(totalPersonalTasks, 5),
                    coordinatingTasksArrays = this.chunkData(totalCoordinatingTasks, 5);
                    console.log(mentoringTasksArrays)
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
                        coordinatingTasks: coordinatingTasksArrays
                    }
                })
        }
    }

    render(){
        return (
            <div className={classes.PendingTasks}>
                {
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
                                    this.state.sentTasks.map(task=>{
                                        return (
                                            <Task key={task.id} readyComponent={true} {...task}/>
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </section>:
                    <></>
                }
                {
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
                                    this.state.mentoringTasks.map(task=>{
                                        return (
                                            <Task key={task.id} readyComponent={false} {...task}/>
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </section>:
                    <></>
                }
                {/* {
                    this.state.totalPersonalTasks?
                        this.state.totalPersonalTasks.length>0?
                            <section className={classes.TasksGroup}>
                                <h2>Personal Tasks</h2>
                                <div className={classes.Tasks}>
                                    {this.state.totalPersonalTasks.map(task=>{
                                        return (
                                            <Task key={task.id} {...task}/>
                                        )
                                    })}
                                </div>
                            </section>:
                        <></>:
                    <></>
                } */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pendingMentoringTasks: state.tasks.pendingMentoringTasks?state.tasks.pendingMentoringTasks:null,
        pendingSentTasks: state.tasks.pendingSentTasks?state.tasks.pendingSentTasks:null,
        pendingPersonalTasks: state.tasks.pendingPersonalTasks?state.tasks.pendingPersonalTasks:null,
        pendingCoordinatingTasks: state.tasks.pendingCoordinatingTasks?state.tasks.pendingCoordinatingTasks:null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchPendingTasks: ()=>dispatch(actions.fetchPendingTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingTasks);