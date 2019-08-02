const loadMore = (oldState, collection, type) => {
    if (collection){
        switch (type) {
            case 'sentTasks':
                return {
                    ...oldState,
                    sentTasks: {
                        ...collection,
                        tasks: collection.tasks.concat(collection.tasksArrays[0]),
                        tasksArrays: collection.tasksArrays.filter((array, index)=>{
                            return index !== 0
                        })
                    }
                };
            case 'personalTasks':
                return {
                    ...oldState,
                    personalTasks: {
                        ...collection,
                        tasks: collection.tasks.concat(collection.tasksArrays[0]),
                        tasksArrays: collection.tasksArrays.filter((array, index)=>{
                            return index !== 0
                        })
                    }
                };
            case 'mentoringTasks':
                return {
                    ...oldState,
                    mentoringTasks: {
                        ...collection,
                        tasks: collection.tasks.concat(collection.tasksArrays[0]),
                        tasksArrays: collection.tasksArrays.filter((array, index)=>{
                            return index !== 0
                        })
                    }
                };
            default:
                if(collection.tasksArrays){
                    return {
                        ...oldState,
                        coordinatingTasks: {
                            ...collection,
                            tasks: collection.tasks.concat(collection.tasksArrays[0]),
                            tasksArrays: collection.tasksArrays.filter((array, index)=>{
                                return index !== 0
                            })
                        }
                    };
                }
            ;
        }
    }
};

export default loadMore;

// loadMore = (type) => {
    //     if (this.state.sentTasksArrays && (type === 'sentTasks')){
    //         this.setState(prevState=>{
    //             return {
    //                 ...prevState,
    //                 sentTasks: prevState.sentTasks.concat(prevState.sentTasksArrays[0]),
    //                 sentTasksArrays: prevState.sentTasksArrays.filter((array, index)=>index!==0)
    //             }
    //         })
    //     }
    //     if (this.state.mentoringTasksArrays && (type === 'mentoringTasks')){
    //         this.setState(prevState=>{
    //             return {
    //                 ...prevState,
    //                 mentoringTasks: prevState.mentoringTasks.concat(prevState.mentoringTasksArrays[0]),
    //                 mentoringTasksArrays: prevState.mentoringTasksArrays.filter((array, index)=>index!==0)
    //             }
    //         })
    //     }
    //     if (this.state.personalTasksArrays && (type === 'personalTasks')){
    //         this.setState(prevState=>{
    //             return {
    //                 ...prevState,
    //                 personalTasks: prevState.personalTasks.concat(prevState.personalTasksArrays[0]),
    //                 personalTasksArrays: prevState.personalTasksArrays.filter((array, index)=>index!==0)
    //             }
    //         })
    //     }
    //     if (this.state.coordinatingTasksArrays && (type === 'coordinatingTasks')){
    //         this.setState(prevState=>{
    //             return {
    //                 ...prevState,
    //                 coordinatingTasks: prevState.coordinatingTasks.concat(prevState.coordinatingTasksArrays[0]),
    //                 coordinatingTasksArrays: prevState.coordinatingTasksArrays.filter((array, index)=>index!==0)
    //             }
    //         })
    //     }
    // }