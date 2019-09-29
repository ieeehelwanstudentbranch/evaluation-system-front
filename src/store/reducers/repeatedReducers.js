export const loadingHandler = (state, action) => {
    return {
        ...state,
        error: null,
        message: null,
        loading: true
    };
}

export const FailerHandler = (state, action) => {
    return {
        ...state,
        error: action.error,
        message: action.message,
        loading: false
    };
}

export const handleData = (state, action) => {
    return {
        ...state,
        data: action.data,
    };
}