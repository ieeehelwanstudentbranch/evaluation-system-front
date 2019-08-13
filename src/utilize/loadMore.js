const loadMore = (oldState, collection, type) => {
    let newObject;
    if(collection.tasksArrays){
        newObject = {
            tasks: collection.tasks.concat(collection.tasksArrays[0]),
            tasksArrays: collection.tasksArrays.filter((array, index)=>{
                return index !== 0
            })
        }
    };
    
    switch (type) {
        case 'sentTasks':
            return {
                ...oldState,
                sentTasks: {
                    ...collection,
                    ...newObject
                }
            };
        case 'personalTasks':
            return {
                ...oldState,
                personalTasks: {
                    ...collection,
                    ...newObject
                }
            };
        case 'mentoringTasks':
            return {
                ...oldState,
                mentoringTasks: {
                    ...collection,
                    ...newObject
                }
            };
        default:
            return {
                ...oldState,
                coordinatingTasks: {
                    ...collection,
                    ...newObject
                }
            };
    }
};

export default loadMore;