const state={
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

export default state