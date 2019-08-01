// const loadMore = (prevState, displayedArray = [], collectionArray = [], type) => {
//     // if (array && (type === 'sentTasks')){
//     //     this.setState(prevState=>{
//     //         return {
//     //             ...prevState,
//     //             sentTasks: prevState.sentTasks.concat(prevState.sentTasksArrays[0]),
//     //             sentTasksArrays: prevState.sentTasksArrays.filter((array, index)=>index!==0)
//     //         }
//     //     })
//     // }
//     // if (array && (type === 'mentoringTasks')){
//     //     this.setState(prevState=>{
//     //         return {
//     //             ...prevState,
//     //             mentoringTasks: prevState.mentoringTasks.concat(prevState.mentoringTasksArrays[0]),
//     //             mentoringTasksArrays: prevState.mentoringTasksArrays.filter((array, index)=>index!==0)
//     //         }
//     //     })
//     // }
//     // if (array && (type === 'personalTasks')){
//     //     this.setState(prevState=>{
//     //         return {
//     //             ...prevState,
//     //             personalTasks: prevState.personalTasks.concat(prevState.personalTasksArrays[0]),
//     //             personalTasksArrays: prevState.personalTasksArrays.filter((array, index)=>index!==0)
//     //         }
//     //     })
//     // }
//     // if (array && (type === 'coordinatingTasks')){
//     //     this.setState(prevState=>{
//     //         return {
//     //             ...prevState,
//     //             coordinatingTasks: prevState.coordinatingTasks.concat(prevState.coordinatingTasksArrays[0]),
//     //             coordinatingTasksArrays: prevState.coordinatingTasksArrays.filter((array, index)=>index!==0)
//     //         }
//     //     })
//     // }
//     if(prevState && collectionArray.length>0){
//         let newDisplayedArray = displayedArray.concat(collectionArray[0]);
//         let newCollectionArray = collectionArray.filter((array, index)=>index!==0);
//         console.log(...prevState);
//         console.log(newDisplayedArray);
//         console.log(newCollectionArray);
//         // return {
//         //     prevState,
//         //     newDisplayedArray,
//         //     newCollectionArray
//         // };
//     }
    
// }

// export default loadMore;

// prevState, displayedArray = [], collectionArray = []

const loadMore = (oldState, collection) => {
    console.log(oldState);
    console.log(collection)
    
    
    
    
    // oldObject[displayedArray]=newDisplayedArray;
    // console.log(oldObject);
    // switch (displayedArray) {
    //     case 'sentTasks':
            
    //         break;
    
    //     default:
    //         break;
    // }
    // return {
    //     oldObject,
    //     ...updatedProperties
    // };
};

export default loadMore;