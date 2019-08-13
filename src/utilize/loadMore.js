const loadMore = (oldState, collection, type) => {
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
};

export default loadMore;